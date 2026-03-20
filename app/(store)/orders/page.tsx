import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Package, Clock, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

export default async function OrdersPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const orders = await (db as any).order.findMany({
        where: { userId: (session as any).userId },
        include: { items: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-12 pb-24">
            <div className="space-y-2">
                <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Siparişlerim</h1>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Tüm sipariş geçmişinizi buradan takip edebilirsiniz</p>
            </div>

            {orders.length === 0 ? (
                <EmptyState 
                    title="Henüz Siparişiniz Yok"
                    description="Görünüşe göre henüz bir sipariş vermemişsiniz. Harika ürünlerimize göz atmaya ne dersiniz?"
                    icon={ShoppingBag}
                    actionLabel="Alışverişe Başla"
                    actionHref="/products"
                />
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <Link 
                            key={order.id} 
                            href={`/orders/${order.id}`}
                            className="group bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-8"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Package className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-black text-zinc-900 dark:text-white uppercase italic text-lg shadow-blue-500">#{order.id}</span>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            order.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                                        <Clock className="w-3 h-3" />
                                        {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-6 md:pt-0">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Toplam Tutar</p>
                                    <p className="text-2xl font-black text-zinc-900 dark:text-white">₺{order.totalAmount.toLocaleString()}</p>
                                </div>
                                <ChevronRight className="w-6 h-6 text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
