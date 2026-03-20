import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Package, Clock, ChevronRight, ShoppingBag, Calendar, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const orders = await (db as any).order.findMany({
        where: { userId: (session as any).userId },
        include: { items: true },
        orderBy: { createdAt: "desc" }
    });

    const statusConfig = {
        PAID: { label: "Ödendi", color: "secondary" },
        PENDING: { label: "Bekliyor", color: "warning" },
        CANCELLED: { label: "İptal Edildi", color: "danger" }
    };

    return (
        <div className="space-y-12 pb-32">
            <div className="space-y-2">
                <h1 className="text-5xl font-bold text-foreground tracking-tight">Siparişlerim</h1>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">Geçmiş alışverişlerinizi ve sipariş durumlarınızı takip edin.</p>
            </div>

            {orders.length === 0 ? (
                <div className="py-20 max-w-2xl mx-auto px-6">
                    <EmptyState 
                        title="Henüz Siparişiniz Yok"
                        description="Görünüşe göre henüz bir sipariş vermemişsiniz. Harika ürünlerimize göz atmaya ne dersiniz?"
                        icon={ShoppingBag}
                        actionLabel="Alışverişe Başla"
                        actionHref="/products"
                    />
                </div>
            ) : (
                <div className="grid gap-8">
                    {orders.map((order: any) => {
                        const status = (statusConfig as any)[order.status] || statusConfig.PENDING;
                        return (
                            <Link 
                                key={order.id} 
                                href={`/orders/${order.id}`}
                                className="group block"
                            >
                                <Card className="p-8 border-border-subtle hover:border-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-surface">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                                <Package className="w-8 h-8" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold text-foreground text-xl tracking-tight">Order #{order.id}</span>
                                                    <Badge variant={status.color} className="rounded-lg px-3 py-1 text-[10px] font-bold">
                                                        {status.label}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                                    <div className="flex items-center gap-1.5 uppercase tracking-wider">
                                                        <Calendar className="w-3.5 h-3.5 opacity-40" />
                                                        {new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-border-subtle" />
                                                    <span className="uppercase tracking-wider">{order.items.length} Ürün</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-6 md:pt-0">
                                            <div className="text-left md:text-right space-y-1">
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Toplam Tutar</p>
                                                <p className="text-3xl font-bold text-foreground tracking-tighter">₺{order.totalAmount.toLocaleString()}</p>
                                            </div>
                                            <Button variant="ghost" size="md" className="h-12 w-12 p-0 rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                <ChevronRight className="w-6 h-6" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
