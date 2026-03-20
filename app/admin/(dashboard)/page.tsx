import { Suspense } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, Users, TrendingUp } from "lucide-react";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming these exist or I'll create them

export const revalidate = 60;

async function StatsSection() {
    const [productCount, orderCount, userCount, salesTotal] = await Promise.all([
        (db as any).product.count(),
        (db as any).order.count(),
        (db as any).user.count(),
        (db as any).order.aggregate({
            _sum: { totalAmount: true },
            where: { status: "PAID" }
        })
    ]);

    const stats = [
        { title: "Toplam Satış", value: `₺${(salesTotal._sum.totalAmount || 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { title: "Siparişler", value: orderCount.toString(), icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
        { title: "Ürünler", value: productCount.toString(), icon: Package, color: "text-indigo-500", bg: "bg-indigo-500/10" },
        { title: "Müşteriler", value: userCount.toString(), icon: Users, color: "text-orange-500", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div key={stat.title} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.title}</p>
                        <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

async function RecentOrdersSection() {
    const latestOrders = await (db as any).order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: true }
    });

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight italic">Son Siparişler</h2>
                <Link href="/admin/orders" className="text-sm font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider">Tümünü Gör</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                            <th className="px-6 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Sipariş No</th>
                            <th className="px-6 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Müşteri</th>
                            <th className="px-6 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Tutar</th>
                            <th className="px-6 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Durum</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        {latestOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                <td className="px-6 py-4 font-bold text-zinc-900 dark:text-white">#{order.id}</td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{order.user?.email || "Misafir"}</td>
                                <td className="px-6 py-4 font-bold text-zinc-900 dark:text-white">₺{order.totalAmount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        order.status === "PAID" ? "bg-emerald-100 text-emerald-700" :
                                        order.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                                        "bg-red-100 text-red-700"
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {latestOrders.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 font-medium">Henüz sipariş bulunmuyor.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default async function AdminDashboard() {
    await verifySession();

    return (
        <div className="space-y-12 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">
                        Mağaza Özeti
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Veriler gerçek zamanlı güncelleniyor</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/products/new" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform shadow-lg">
                        Yeni Ürün Ekle
                    </Link>
                </div>
            </div>

            <Suspense fallback={<div className="grid grid-cols-4 gap-6 animate-pulse"><div className="h-32 bg-zinc-100 rounded-3xl"/><div className="h-32 bg-zinc-100 rounded-3xl"/><div className="h-32 bg-zinc-100 rounded-3xl"/><div className="h-32 bg-zinc-100 rounded-3xl"/></div>}>
                <StatsSection />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
                <div className="lg:col-span-2">
                    <Suspense fallback={<div className="h-96 bg-zinc-100 rounded-3xl animate-pulse"/>}>
                        <RecentOrdersSection />
                    </Suspense>
                </div>
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase italic tracking-tight mb-2">Hızlı Erişim</h3>
                            <p className="text-blue-100 text-sm mb-6 font-medium">Kategori ve stok yönetimini buradan hızlıca yapabilirsiniz.</p>
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/admin/categories" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl backdrop-blur-md transition-colors text-center font-bold text-xs uppercase tracking-widest">Kategoriler</Link>
                                <Link href="/admin/users" className="bg-white/10 hover:bg-white/20 p-4 rounded-2xl backdrop-blur-md transition-colors text-center font-bold text-xs uppercase tracking-widest">Kullanıcılar</Link>
                            </div>
                        </div>
                        <ShoppingBag className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}
