import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, ListTree, Edit, Trash2, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default async function CategoriesPage() {
    const categories = await (db as any).category.findMany({
        include: { _count: { select: { products: true } }, parent: true },
        orderBy: { name: "asc" }
    });

    return (
        <div className="space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-foreground tracking-tight">Kategoriler</h1>
                    <p className="text-sm text-muted-foreground font-medium">Ürün hiyerarşisini ve koleksiyonlarınızı düzenleyin.</p>
                </div>
                <Link href="/admin/categories/new">
                    <Button size="lg" className="rounded-2xl px-10 gap-3 shadow-xl shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="w-5 h-5" /> Yeni Kategori
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <Card className="lg:col-span-2 overflow-hidden border-border-subtle shadow-sm">
                    <div className="p-8 border-b border-border-subtle bg-surface/50">
                        <h2 className="text-2xl font-bold text-foreground tracking-tight">Tüm Kategoriler</h2>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30">
                                <TableHead className="font-bold text-xs uppercase tracking-widest pl-8">Kategori Bilgisi</TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-widest text-center">Ürün Sayısı</TableHead>
                                <TableHead className="font-bold text-xs uppercase tracking-widest pr-8 text-right">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category: any) => (
                                <TableRow key={category.id} className="hover:bg-muted/20 transition-colors group">
                                    <TableCell className="pl-8 py-6">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100/50 group-hover:scale-105 transition-transform">
                                                <ListTree className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center gap-2">
                                                    {category.parent && (
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                                                            {category.parent.name} <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="font-bold text-foreground text-lg hover:text-indigo-600 cursor-pointer transition-colors">{category.name}</span>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">ID: {category.id.slice(0, 8)}...</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline" className="rounded-lg px-4 py-1.5 text-sm font-bold border-indigo-100 text-indigo-600 bg-indigo-50">
                                            {category._count.products} Ürün
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="pr-8 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            <Link href={`/admin/categories/${category.id}`}>
                                                <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl hover:text-indigo-600 hover:border-indigo-200 shadow-sm bg-white">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl hover:text-danger hover:border-danger/40 shadow-sm bg-white">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {categories.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="py-20">
                                        <EmptyState 
                                            title="Kategori Bulunamadı"
                                            description="Sistemde henüz kayıtlı bir kategori bulunmuyor. Yeni bir kategori ekleyerek başlayın."
                                            icon={ListTree}
                                            actionLabel="Yeni Kategori Ekle"
                                            actionHref="/admin/categories/new"
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <div className="space-y-8">
                    <Card className="bg-gradient-to-br from-indigo-500 to-purple-700 p-10 text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden group border-none rounded-card">
                        <div className="relative z-10 space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                <Info className="w-6 h-6 text-indigo-100" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold tracking-tight">Hiyerarşi Önemlidir</h3>
                                <p className="text-indigo-100 font-medium leading-relaxed opacity-90">
                                    Kategoriler arasında alt-üst ilişkisi kurarak ürünlerinizi daha iyi hiyerarşize edebilirsiniz. Bu hem mağaza yönetimini kolaylaştırır hem de müşterilerinizin aradıklarını bulmasına yardımcı olur.
                                </p>
                            </div>
                        </div>
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                        <ListTree className="absolute -right-6 -bottom-6 w-56 h-56 text-white/5 rotate-12 transition-transform duration-700 group-hover:scale-110" />
                    </Card>
                    {/* Future: Quick Add Category Mini-form */}
                </div>
            </div>
        </div>
    );
}
