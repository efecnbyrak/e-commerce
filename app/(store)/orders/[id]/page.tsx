import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { ShoppingBag, MapPin, CreditCard, ChevronLeft, Package, User, Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
    const session = await getSession();
    if (!session) redirect("/login");

    const id = parseInt(params.id);
    if (isNaN(id)) {
        return (
            <div className="py-24 max-w-2xl mx-auto px-6">
                <EmptyState 
                    title="Geçersiz Sipariş"
                    description="Sipariş numarası hatalı veya geçersiz."
                    icon={Package}
                    actionLabel="Siparişlerime Dön"
                    actionHref="/orders"
                />
            </div>
        );
    }

    const order = await (db as any).order.findUnique({
        where: { id },
        include: { 
            items: {
                include: { product: true }
            }
        }
    });

    if (!order || (order as any).userId !== (session as any).userId) {
        return (
            <div className="py-24 max-w-2xl mx-auto px-6">
                <EmptyState 
                    title="Sipariş Bulunamadı"
                    description="Aradığınız sipariş mevcut değil veya erişim yetkiniz yok."
                    icon={Package}
                    actionLabel="Siparişlerime Dön"
                    actionHref="/orders"
                />
            </div>
        );
    }

    const statusConfig = {
        PAID: { label: "Ödendi", icon: CheckCircle2, color: "secondary" },
        PENDING: { label: "Bekliyor", icon: Clock, color: "warning" },
        CANCELLED: { label: "İptal Edildi", icon: XCircle, color: "danger" }
    };

    const status = (statusConfig as any)[order.status] || statusConfig.PENDING;

    return (
        <div className="space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                    <Link href="/orders">
                        <Button variant="outline" size="md" className="h-14 w-14 p-0 rounded-2xl border-border-subtle bg-surface shadow-sm">
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-bold text-foreground tracking-tight">Sipariş Detayı</h1>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">Sipariş ID: #{order.id}</p>
                    </div>
                </div>
                <Badge variant={status.color} className="h-12 px-6 rounded-xl gap-2 text-sm font-bold shadow-sm">
                    <status.icon className="w-4 h-4" /> {status.label}
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="overflow-hidden border-border-subtle shadow-sm bg-surface">
                        <div className="p-8 border-b border-border-subtle bg-surface/50">
                            <h2 className="text-lg font-bold text-foreground tracking-tight">Ürünler</h2>
                        </div>
                        <div className="divide-y divide-border-subtle">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="p-10 flex items-center gap-8 group">
                                    <div className="w-24 h-24 rounded-2xl bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden border border-border-subtle group-hover:scale-105 transition-transform shadow-sm">
                                        {item.product.images ? (
                                            <Image src={JSON.parse(item.product.images)[0] || "/placeholder.png"} alt={item.product.name} width={120} height={120} className="object-cover w-full h-full" />
                                        ) : (
                                            <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-foreground text-xl truncate group-hover:text-primary transition-colors tracking-tight">{item.product.name}</h3>
                                        <p className="text-sm text-muted-foreground font-medium mt-1">{item.quantity} Adet × ₺{item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-2xl text-foreground tracking-tight">₺{(item.quantity * item.price).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-10 bg-surface/50 border-t border-border-subtle">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Toplam Tutar</span>
                                <span className="text-5xl font-bold text-primary tracking-tighter shadow-sm">₺{order.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="p-10 border-border-subtle shadow-sm bg-surface space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <MapPin className="w-5 h-5 text-primary" />
                                <h3 className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">Teslimat Adresi</h3>
                            </div>
                            <div className="bg-surface p-6 rounded-2xl border border-border-subtle">
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                                    {order.shippingAddress}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <CreditCard className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">Ödeme Bilgisi</h3>
                            </div>
                            <div className="bg-surface p-6 rounded-2xl border border-border-subtle flex items-center justify-between">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Yöntem</span>
                                <span className="text-sm font-bold text-foreground uppercase tracking-tighter">KREDİ KARTI</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Calendar className="w-5 h-5 text-amber-500" />
                                <h3 className="text-xs font-bold text-foreground uppercase tracking-[0.2em]">Sipariş Tarihi</h3>
                            </div>
                            <div className="bg-surface p-6 rounded-2xl border border-border-subtle">
                                <p className="text-sm text-foreground font-bold">
                                    {new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
