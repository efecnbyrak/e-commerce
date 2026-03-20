import { db } from "@/lib/db";
import Link from "next/link";
import { Search, Filter, ShoppingBag, Eye, Printer, MoreVertical, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default async function OrdersPage() {
    const orders = await (db as any).order.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-foreground tracking-tight">Sipariş Yönetimi</h1>
                    <p className="text-sm text-muted-foreground font-medium">Tüm gelen siparişleri ve ödeme durumlarını buradan takip edin.</p>
                </div>
            </div>

            <Card className="overflow-hidden border-border-subtle shadow-sm">
                <div className="p-8 border-b border-border-subtle flex flex-col md:flex-row gap-6 justify-between bg-surface/50">
                    <div className="relative flex-1 group w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Sipariş no, müşteri e-posta ara..." 
                            className="w-full pl-14 pr-6 h-14 bg-white border border-border-subtle rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none shadow-sm"
                        />
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-14 px-8 gap-3 border-border-subtle rounded-2xl font-bold bg-white">
                            <Filter className="w-5 h-5" /> Filtrele
                        </Button>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30">
                            <TableHead className="font-bold text-xs uppercase tracking-widest pl-8">Sipariş No</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Müşteri</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Tarih</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Tutar</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Durum</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest pr-8 text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="py-24">
                                    <EmptyState 
                                        title="Sipariş Bulunamadı"
                                        description="Henüz hiçbir sipariş alınmamış veya arama kriterlerine uygun bir sipariş bulunmuyor."
                                        icon={ShoppingBag}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                        {orders.map((order: any) => (
                            <TableRow key={order.id} className="hover:bg-muted/20 transition-colors group">
                                <TableCell className="pl-8 py-6">
                                    <div className="flex items-center gap-4 text-foreground">
                                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center border border-border-subtle group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                                            <ShoppingBag className="w-4.5 h-4.5 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <span className="font-bold text-base tracking-tight">#{order.id.slice(0, 8)}...</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col space-y-0.5">
                                        <span className="font-bold text-foreground">{order.user?.firstName} {order.user?.lastName}</span>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{order.user?.email || "Misafir"}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-muted-foreground font-medium">
                                        <Calendar className="w-3.5 h-3.5 opacity-40" />
                                        <span className="text-sm">{new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-bold text-foreground text-lg">₺{order.totalAmount.toLocaleString()}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={order.status === "PAID" ? "secondary" : order.status === "PENDING" ? "warning" : "danger"} className="rounded-lg px-3 py-1 text-xs font-bold">
                                        {order.status === "PAID" ? "Ödendi" : order.status === "PENDING" ? "Bekliyor" : "İptal"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="pr-8 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <Link href={`/admin/orders/${order.id}`}>
                                            <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl hover:text-primary hover:border-primary/40 shadow-sm bg-white">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl hover:text-zinc-600 hover:border-zinc-300 shadow-sm bg-white">
                                            <Printer className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
