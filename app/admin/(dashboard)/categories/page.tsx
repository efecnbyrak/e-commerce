import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, ListTree, Edit, Trash2, ChevronRight, Info, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default async function CategoriesPage() {
    const categories = await (db as any).category.findMany({
        include: { _count: { select: { products: true } }, parent: true },
        orderBy: { name: "asc" }
    });

    return (
        <div className="space-y-16 pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <span>Organizasyon</span>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">Kategoriler</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tighter">Kategori Yönetimi</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">Ürün hiyerarşisini ve koleksiyonlarınızı düzenleyerek mağaza düzenini optimize edin.</p>
                </div>
                <Link href="/admin/categories/new">
                    <Button size="lg" className="rounded-2xl px-10 h-16 gap-3 shadow-2xl shadow-primary/30 text-[15px] font-bold">
                        <Plus className="w-5 h-5" /> Yeni Kategori Ekle
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 overflow-hidden border-white/5 bg-zinc-900/40 backdrop-blur-xl shadow-3xl">
                    <div className="p-10 border-b border-white/5 bg-white/5">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Tüm Kategoriler</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 bg-zinc-950/30 hover:bg-zinc-950/30 h-16">
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pl-10 text-zinc-600">Kategori Bilgisi</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-center text-zinc-600">Ürün Sayısı</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pr-10 text-right text-zinc-600">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category: any) => (
                                    <TableRow key={category.id} className="border-white/5 hover:bg-white/5 transition-all duration-300 group">
                                        <TableCell className="pl-10 h-28">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 rounded-2xl bg-zinc-950 flex-shrink-0 flex items-center justify-center border border-white/5 shadow-xl">
                                                    <ListTree className="w-7 h-7 text-primary" />
                                                </div>
                                                <div className="flex flex-col min-w-0 space-y-1.5">
                                                    <div className="flex items-center gap-2">
                                                        {category.parent && (
                                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-1.5">
                                                                {category.parent.name} <ChevronRight className="w-3 h-3 text-zinc-800" />
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="font-bold text-[17px] text-white truncate leading-tight group-hover:text-primary transition-colors duration-300">{category.name}</span>
                                                    <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest">ID: #{category.id}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="rounded-xl px-5 py-2 text-[11px] font-bold border-white/5 text-zinc-400 bg-white/5 uppercase tracking-widest">
                                                {category._count.products} ÜRÜN
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="pr-10 text-right">
                                            <div className="flex items-center justify-end gap-3 transition-all duration-300">
                                                <Link href={`/admin/categories/${category.id}`}>
                                                    <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all">
                                                        <Edit className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-danger hover:bg-danger/10 hover:border-danger/30 transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {categories.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="py-40">
                                            <div className="flex flex-col items-center justify-center text-center space-y-6">
                                                 <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-zinc-700">
                                                     <ListTree className="w-12 h-12" />
                                                 </div>
                                                 <div className="space-y-2">
                                                     <h3 className="text-2xl font-bold text-white tracking-tight">Kategori Bulunamadı</h3>
                                                     <p className="text-zinc-500 max-w-xs font-medium">Henüz bir kategori eklemediniz.</p>
                                                 </div>
                                                 <Link href="/admin/categories/new">
                                                     <Button className="rounded-xl px-8 h-12">İlk Kategoriyi Ekle</Button>
                                                 </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                <div className="space-y-12">
                    <Card className="bg-gradient-to-br from-primary/80 to-indigo-900/80 backdrop-blur-3xl p-12 text-white shadow-3xl shadow-primary/20 relative overflow-hidden group border border-white/10 rounded-[2.5rem]">
                        <div className="relative z-10 space-y-8">
                            <div className="w-16 h-16 rounded-[1.25rem] bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Info className="w-8 h-8 text-white" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold tracking-tight">Hiyerarşi Kılavuzu</h3>
                                <p className="text-zinc-100 font-medium leading-relaxed opacity-80 text-sm">
                                    Kategoriler arasında alt-üst ilişkisi kurarak envanterinizi daha iyi organize edebilir, müşterilerinizin aradıklarını saniyeler içinde bulmasını sağlayabilirsiniz.
                                </p>
                            </div>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                        <ListTree className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12 transition-transform duration-1000 group-hover:scale-110" />
                    </Card>

                    <Card className="p-10 border-white/5 bg-zinc-900/40 backdrop-blur-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <Package className="w-6 h-6 text-primary" />
                            <h4 className="text-xl font-bold text-white tracking-tight">Hızlı İstatistik</h4>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center py-4 border-b border-white/5">
                                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Aktif Kategori</span>
                                <span className="text-xl font-bold text-white tracking-tight">{categories.length}</span>
                            </div>
                            <div className="flex justify-between items-center py-4">
                                <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">En Çok Atanan</span>
                                <span className="text-sm font-bold text-primary tracking-tight">Ayakkabı</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
