import { db } from "@/lib/db";
import Link from "next/link";
import { Search, Filter, ShoppingBag, Eye, Printer, MoreVertical, Calendar, ChevronRight, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default async function OrdersPage() {
    const orders = await (db as any).order.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-16 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <span>Finans</span>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">Sipariş Yönetimi</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tighter">Sipariş Yönetimi</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">Tüm gelen siparişleri, ödeme durumlarını ve teslimat süreçlerini buradan takip edin.</p>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Sipariş no veya müşteri ara..." 
                        className="w-full pl-16 pr-6 h-14 bg-white/5 border border-white/5 rounded-2xl text-[15px] font-medium text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    />
                </div>
                <div className="flex gap-4 w-full lg:w-auto">
                    <Button variant="outline" className="h-14 px-8 gap-3 border-white/10 rounded-2xl font-bold text-zinc-400 hover:bg-white/5">
                        <Filter className="w-5 h-5" /> Gelişmiş Filtrele
                    </Button>
                </div>
            </Card>

            <Card className="overflow-hidden border-white/5 bg-zinc-900/40 backdrop-blur-xl shadow-3xl">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 bg-zinc-950/30 hover:bg-zinc-950/30 h-16">
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pl-10 text-zinc-600">Sipariş No</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Müşteri Bilgisi</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600 px-6">Tarih</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Toplam Tutar</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600 text-center">Durum</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pr-10 text-right text-zinc-600">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order: any) => (
                                <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-all duration-300 group">
                                    <TableCell className="pl-10 h-28">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-950 flex items-center justify-center border border-white/5 shadow-xl group-hover:bg-primary/5 transition-colors duration-500">
                                                <ShoppingBag className="w-7 h-7 text-primary" />
                                            </div>
                                            <span className="font-bold text-[17px] text-white tracking-widest leading-tight">#{order.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col space-y-1.5 min-w-[200px]">
                                            <span className="font-bold text-white text-[15px] group-hover:text-primary transition-colors">{order.user?.firstName} {order.user?.lastName || "Misafir Müşteri"}</span>
                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{order.user?.email || "E-POSTA YOK"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6">
                                        <div className="flex items-center gap-3 text-zinc-500 font-medium whitespace-nowrap">
                                            <Calendar className="w-4 h-4 opacity-40 text-primary" />
                                            <span className="text-sm">{new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/10">
                                                 <CreditCard className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <span className="font-bold text-white text-xl tracking-tighter italic">₺{order.totalAmount.toLocaleString()}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge 
                                            variant={order.status === "PAID" ? "secondary" : "danger"} 
                                            className={`rounded-xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border-none ${
                                                order.status === "PAID" ? 'bg-emerald-500/10 text-emerald-500' : 
                                                order.status === "PENDING" ? 'bg-amber-500/10 text-amber-500' : 'bg-danger/10 text-danger'
                                            }`}
                                        >
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" />
                                                {order.status === "PAID" ? "ÖDENDİ" : order.status === "PENDING" ? "BEKLİYOR" : "İPTAL"}
                                            </span>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="pr-10 text-right">
                                        <div className="flex items-center justify-end gap-3 transition-all duration-300">
                                            <Link href={`/admin/orders/${order.id}`}>
                                                <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all shadow-xl">
                                                    <Eye className="w-5 h-5" />
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-white transition-all shadow-xl">
                                                <Printer className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
