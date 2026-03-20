import { Suspense } from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Package, Users, TrendingUp, ArrowRight, Zap } from "lucide-react";
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
        { title: "Toplam Satış", value: `₺${(salesTotal._sum.totalAmount || 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
        { title: "Siparişler", value: orderCount.toString(), icon: ShoppingBag, color: "text-primary", bg: "bg-primary/5", border: "border-primary/10" },
        { title: "Ürünler", value: productCount.toString(), icon: Package, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
        { title: "Müşteriler", value: userCount.toString(), icon: Users, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
                <Card key={stat.title} className={`p-8 border ${stat.border} hover:shadow-card-hover transition-all group`}>
                    <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <stat.icon className={`w-7 h-7 ${stat.color}`} />
                        </div>
                        <Badge variant="outline" className="text-[10px] font-bold">+12.5%</Badge>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                        <p className="text-4xl font-bold text-foreground tracking-tight">{stat.value}</p>
                    </div>
                </Card>
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
        <Card className="overflow-hidden border-border-subtle shadow-sm">
            <div className="p-8 border-b border-border-subtle flex items-center justify-between bg-surface/50">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">Son Siparişler</h2>
                    <p className="text-sm text-muted-foreground font-medium">Mağazanızdaki en son aktiviteler.</p>
                </div>
                <Link href="/admin/orders">
                    <Button variant="outline" size="sm" className="rounded-xl font-bold">Tümünü Gör</Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30">
                        <TableHead className="font-bold text-xs uppercase tracking-widest pl-8">Sipariş No</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-widest">Müşteri</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-widest">Tutar</TableHead>
                        <TableHead className="font-bold text-xs uppercase tracking-widest pr-8 text-right">Durum</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {latestOrders.map((order: any) => (
                        <TableRow key={order.id} className="hover:bg-muted/20 transition-colors">
                            <TableCell className="font-bold text-foreground pl-8">#{order.id.slice(0, 8)}...</TableCell>
                            <TableCell className="text-muted-foreground font-medium">{order.user?.email || "Misafir"}</TableCell>
                            <TableCell className="font-bold text-foreground text-lg">₺{order.totalAmount.toLocaleString()}</TableCell>
                            <TableCell className="pr-8 text-right">
                                <Badge variant={order.status === "PAID" ? "secondary" : order.status === "PENDING" ? "warning" : "danger"} className="rounded-lg">
                                    {order.status === "PAID" ? "Ödendi" : order.status === "PENDING" ? "Bekliyor" : "İptal"}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                    {latestOrders.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="h-40 text-center text-muted-foreground font-medium italic">Henüz sipariş bulunmuyor.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}

export default async function AdminDashboard() {
    await verifySession();

    return (
        <div className="space-y-16 pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold text-foreground tracking-tight">Mağaza Paneli</h1>
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Canlı Veri Akışı Aktif</p>
                    </div>
                </div>
                <Link href="/admin/products/new">
                    <Button size="lg" className="rounded-2xl px-10 gap-3 shadow-xl shadow-primary/20">
                        <Package className="w-5 h-5" /> Yeni Ürün Ekle
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<div className="grid grid-cols-4 gap-8 animate-pulse"><div className="h-40 bg-zinc-100 rounded-card"/><div className="h-40 bg-zinc-100 rounded-card"/><div className="h-40 bg-zinc-100 rounded-card"/><div className="h-40 bg-zinc-100 rounded-card"/></div>}>
                <StatsSection />
            </Suspense>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
                <div className="lg:col-span-2">
                    <Suspense fallback={<div className="h-96 bg-zinc-100 rounded-card animate-pulse"/>}>
                        <RecentOrdersSection />
                    </Suspense>
                </div>
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-indigo-600 to-primary p-12 rounded-card text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-3">
                                <h3 className="text-3xl font-bold tracking-tight">Hızlı Yönetim</h3>
                                <p className="text-indigo-100 font-medium leading-relaxed">Mağazanızı tek panelden kolayca yönetin, verimliliğinizi artırın.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <Link href="/admin/categories">
                                    <Button variant="outline" className="w-full h-16 bg-white/10 border-white/20 hover:bg-white hover:text-primary rounded-xl font-bold border-2 transition-all group/btn">
                                        Kategorileri Yönet <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link href="/admin/users">
                                    <Button variant="outline" className="w-full h-16 bg-white/10 border-white/20 hover:bg-white hover:text-primary rounded-xl font-bold border-2 transition-all group/btn">
                                        Kullanıcıları Yönet <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                        <Zap className="absolute -right-6 -bottom-6 w-56 h-56 text-white/5 rotate-12 transition-transform duration-700 group-hover:scale-110" />
                    </div>
                </div>
            </div>
        </div>
    );
}
