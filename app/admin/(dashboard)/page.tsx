import { Suspense } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, Users, TrendingUp, ArrowRight, Zap, Target, BarChart3, Clock } from "lucide-react";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/session";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

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
        { title: "Toplam Satış", value: `₺${(salesTotal._sum.totalAmount || 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", href: "/admin/orders" },
        { title: "Siparişler", value: orderCount.toString(), icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", href: "/admin/orders" },
        { title: "Ürünler", value: productCount.toString(), icon: Package, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", href: "/admin/products" },
        { title: "Müşteriler", value: userCount.toString(), icon: Users, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", href: "/admin/users" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
                <Link key={stat.title} href={stat.href}>
                    <Card className={`p-8 bg-zinc-900/40 border-white/5 backdrop-blur-xl hover:bg-zinc-900/60 transition-all group overflow-hidden relative cursor-pointer active:scale-95`}>
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-primary/5 transition-colors" />
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                                <stat.icon className={`w-7 h-7 ${stat.color}`} />
                            </div>
                            <Badge variant="outline" className="text-[10px] font-bold border-white/10 text-zinc-400">+12%</Badge>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{stat.title}</p>
                            <p className="text-4xl font-bold text-white tracking-tighter">{stat.value}</p>
                        </div>
                    </Card>
                </Link>
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
        <Card className="overflow-hidden border-white/5 bg-zinc-900/40 backdrop-blur-xl shadow-2xl">
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Son Siparişler</h2>
                    <p className="text-sm text-zinc-500 font-medium">Mağazanızdaki en son aktivitelerin özeti.</p>
                </div>
                <Link href="/admin/orders">
                    <Button variant="outline" size="sm" className="rounded-xl font-bold border-white/10 hover:bg-white/5">Tümünü Yönet</Button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-white/5 bg-zinc-950/20 hover:bg-zinc-950/20">
                            <TableHead className="font-bold text-[10px] uppercase tracking-[0.2em] pl-10 text-zinc-600">Sipariş No</TableHead>
                            <TableHead className="font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-600">Müşteri</TableHead>
                            <TableHead className="font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-600">Tutar</TableHead>
                            <TableHead className="font-bold text-[10px] uppercase tracking-[0.2em] pr-10 text-right text-zinc-600">Durum</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {latestOrders.map((order: any) => (
                            <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                                <TableCell className="font-bold text-white pl-10 h-20">
                                    <span className="opacity-40 font-medium mr-1">#</span>{order.id}
                                </TableCell>
                                <TableCell className="text-zinc-400 font-medium">
                                    {order.user?.email || "Misafir Kullanıcı"}
                                </TableCell>
                                <TableCell className="font-bold text-primary text-lg tracking-tight">
                                    ₺{order.totalAmount.toLocaleString()}
                                </TableCell>
                                <TableCell className="pr-10 text-right">
                                    <Badge variant={order.status === "PAID" ? "secondary" : order.status === "PENDING" ? "warning" : "danger"} className="rounded-xl px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">
                                        {order.status === "PAID" ? "ÖDENDİ" : order.status === "PENDING" ? "BEKLİYOR" : "İPTAL"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        {latestOrders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-60 text-center text-zinc-600 font-bold uppercase tracking-widest text-xs italic">
                                    <Clock className="w-10 h-10 mx-auto mb-4 opacity-10" />
                                    Henüz sipariş bulunmuyor.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}

export default async function AdminDashboard() {
    await verifySession();

    return (
        <div className="space-y-16">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="space-y-3">
                    <h1 className="text-6xl font-bold text-white tracking-tighter">Panel Verileri</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                             <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Sistem Çevrimiçi</p>
                        </div>
                        <div className="h-4 w-px bg-zinc-800" />
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.1em]">Son Güncelleme: Az Önce</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/products/new">
                        <Button size="lg" className="rounded-2xl px-10 h-16 gap-3 shadow-2xl shadow-primary/30 text-[15px] font-bold">
                            <Package className="w-5 h-5" /> Yeni Ürün Ekle
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Quick Insights */}
            <Suspense fallback={<div className="grid grid-cols-4 gap-8 animate-pulse"><div className="h-48 bg-zinc-900/50 rounded-card"/><div className="h-48 bg-zinc-900/50 rounded-card"/><div className="h-48 bg-zinc-900/50 rounded-card"/><div className="h-48 bg-zinc-900/50 rounded-card"/></div>}>
                <StatsSection />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Activities */}
                <div className="lg:col-span-2 space-y-12">
                    <Suspense fallback={<div className="h-[600px] bg-zinc-900/50 rounded-card animate-pulse"/>}>
                        <RecentOrdersSection />
                    </Suspense>
                </div>

                {/* Sidebar Management */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-primary to-indigo-600 p-12 rounded-[2.5rem] text-white shadow-3xl shadow-primary/20 relative overflow-hidden group border border-white/10">
                        <div className="relative z-10 space-y-10">
                            <div className="space-y-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <Target className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-bold tracking-tight">Hızlı Yönetim</h3>
                                <p className="text-indigo-100 font-medium leading-relaxed opacity-80 text-sm">Mağaza ayarlarını ve verilerini saniyeler içinde güncelleyin.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <Link href="/admin/categories">
                                    <Button variant="outline" className="w-full h-16 bg-white/10 border-white/20 hover:bg-white hover:text-primary rounded-2xl font-bold border-2 transition-all group/btn">
                                        Kategoriler <ArrowRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/admin/users">
                                    <Button variant="outline" className="w-full h-16 bg-white/10 border-white/20 hover:bg-white hover:text-primary rounded-2xl font-bold border-2 transition-all group/btn">
                                        Kullanıcılar <ArrowRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/admin/settings">
                                    <Button variant="outline" className="w-full h-16 bg-white/20 border-white/20 hover:bg-white hover:text-primary rounded-2xl font-bold border-2 transition-all group/btn">
                                        Sistem Ayarları <ArrowRight className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-50" />
                        <Zap className="absolute -right-10 -bottom-10 w-72 h-72 text-white/10 rotate-[20deg] transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-0" />
                    </div>

                    <Card className="p-10 border-white/5 bg-zinc-900/40 backdrop-blur-xl space-y-8">
                        <div className="flex items-center gap-4">
                            <BarChart3 className="w-6 h-6 text-primary" />
                            <h4 className="text-xl font-bold text-white tracking-tight">Performans</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    <span>Hedef Satış</span>
                                    <span className="text-white">74%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[74%] bg-primary shadow-lg shadow-primary/40 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    <span>Stok Kapasitesi</span>
                                    <span className="text-white">42%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[42%] bg-emerald-500 shadow-lg shadow-emerald-500/40 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
