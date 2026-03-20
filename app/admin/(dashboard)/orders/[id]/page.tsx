import { db } from "@/lib/db";
import { ShoppingBag, User, MapPin, CreditCard, ChevronLeft, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return (
            <div className="py-12 max-w-2xl mx-auto">
                <EmptyState 
                    title="Geçersiz ID"
                    description="Geçersiz sipariş kimliği sağlandı."
                    icon={Package}
                    actionLabel="Siparişlere Dön"
                    actionHref="/admin/orders"
                />
            </div>
        );
    }

    const order = await (db as any).order.findUnique({
        where: { id },
        include: { 
            user: true,
            items: {
                include: { product: true }
            }
        }
    });

    if (!order) {
        return (
            <div className="py-12 max-w-2xl mx-auto">
                <EmptyState 
                    title="Sipariş Bulunamadı"
                    description="Görüntülemek istediğiniz sipariş mevcut değil."
                    icon={Package}
                    actionLabel="Siparişlere Dön"
                    actionHref="/admin/orders"
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-24">
            <div className="flex items-center gap-4">
                <Link href="/admin/orders" className="p-3 bg-white dark:bg-zinc-800 rounded-2xl hover:bg-zinc-100 transition-colors shadow-sm">
                    <ChevronLeft className="w-5 h-5 text-zinc-500" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Sipariş Detayı</h1>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Sipariş ID: #{order.id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                            <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight italic">Ürünler</h2>
                        </div>
                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-8 flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
                                        {item.product.images ? (
                                            <Image src={JSON.parse(item.product.images)[0] || "/placeholder.png"} alt={item.product.name} width={80} height={80} className="object-cover w-full h-full" />
                                        ) : (
                                            <ShoppingBag className="w-8 h-8 text-zinc-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-zinc-900 dark:text-white text-lg truncate">{item.product.name}</h3>
                                        <p className="text-sm text-zinc-500 font-medium">{item.quantity} x ₺{item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-xl text-zinc-900 dark:text-white">₺{(item.quantity * item.price).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-8 bg-zinc-50/50 dark:bg-zinc-800/20 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-black text-zinc-500 uppercase tracking-widest">Toplam Tutar</span>
                                <span className="text-3xl font-black text-blue-600">₺{order.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl p-8 space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <User className="w-5 h-5 text-blue-500" />
                                <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em]">Müşteri Bilgisi</h3>
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold text-zinc-900 dark:text-white">{(order as any).user?.firstName} {(order as any).user?.lastName}</p>
                                <p className="text-sm text-zinc-500 font-medium">{(order as any).user?.email || "Misafir"}</p>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <MapPin className="w-5 h-5 text-emerald-500" />
                                <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em]">Teslimat Adresi</h3>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                {order.shippingAddress}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <CreditCard className="w-5 h-5 text-amber-500" />
                                <h3 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-[0.2em]">Ödeme Durumu</h3>
                            </div>
                            <span className={`inline-block px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
                                order.status === "PAID" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            }`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
