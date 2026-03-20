import { db } from "@/lib/db";
import Link from "next/link";
import { Search, Filter, ShoppingBag, Eye, Printer, MoreVertical } from "lucide-react";

export default async function OrdersPage() {
    const orders = await db.order.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-8 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Siparişler</h1>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Gelen tüm siparişleri ve ödemeleri yönetin</p>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-4 justify-between bg-zinc-50/50 dark:bg-zinc-800/20">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input 
                            type="text" 
                            placeholder="Sipariş no, müşteri e-posta ara..." 
                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-6 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filtrele
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/40">
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Sipariş Bilgisi</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Müşteri</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Tarih</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Tutar</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Durum</th>
                                <th className="px-8 py-6 text-right text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-sm">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                <ShoppingBag className="w-4 h-4 text-zinc-500" />
                                            </div>
                                            <span className="font-bold text-zinc-900 dark:text-white">#{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-zinc-900 dark:text-white">{order.user?.firstName} {order.user?.lastName}</span>
                                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{order.user?.email || "Misafir"}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-zinc-500">
                                        {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-black text-lg text-zinc-900 dark:text-white">₺{order.totalAmount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            order.status === "PAID" ? "bg-emerald-100 text-emerald-700" :
                                            order.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                                            "bg-red-100 text-red-700"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/admin/orders/${order.id}`} className="p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:text-blue-600 transition-all">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <button className="p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:text-zinc-600 transition-all">
                                                <Printer className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
