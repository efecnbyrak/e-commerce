import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, Package } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export default async function ProductsPage() {
    const products = await (db as any).product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-12 pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold text-foreground tracking-tight">Ürün Yönetimi</h1>
                    <p className="text-sm text-muted-foreground font-medium">Envanterinizdeki tüm ürünleri buradan takip edin.</p>
                </div>
                <Link href="/admin/products/new">
                    <Button size="lg" className="rounded-2xl px-10 gap-3 shadow-xl shadow-primary/20">
                        <Plus className="w-5 h-5" /> Yeni Ürün Ekle
                    </Button>
                </Link>
            </div>

            <Card className="overflow-hidden border-border-subtle shadow-sm">
                <div className="p-8 border-b border-border-subtle flex flex-col md:flex-row gap-6 justify-between bg-surface/50">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Ürün adı, kod veya kategori ara..." 
                            className="w-full pl-14 pr-6 h-14 bg-white border border-border-subtle rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
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
                            <TableHead className="font-bold text-xs uppercase tracking-widest pl-8">Ürün Bilgisi</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Kategori</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Fiyat</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Stok</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest">Durum</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest pr-8 text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="py-24">
                                    <EmptyState 
                                        title="Ürün Bulunamadı"
                                        description="Henüz hiçbir ürün eklenmemiş veya arama kriterlerine uygun ürün bulunamadı."
                                        icon={Package}
                                        actionLabel="Yeni Ürün Ekle"
                                        actionHref="/admin/products/new"
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                        {products.map((product: any) => (
                            <TableRow key={product.id} className="hover:bg-muted/20 transition-colors group">
                                <TableCell className="pl-8 py-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-2xl bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden border border-border-subtle shadow-sm group-hover:scale-105 transition-transform">
                                            {product.images ? (
                                                <Image src={JSON.parse(product.images)[0] || "/placeholder.png"} alt={product.name} width={80} height={80} className="object-cover w-full h-full" />
                                            ) : (
                                                <Package className="w-6 h-6 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex flex-col min-w-0 space-y-1">
                                            <span className="font-bold text-foreground truncate text-base hover:text-primary cursor-pointer transition-colors">{product.name}</span>
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">#{product.id.slice(0, 8)}...</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="rounded-lg px-3 py-1 text-xs font-bold border-indigo-100 text-indigo-600 bg-indigo-50">
                                        {product.category.name}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-foreground text-lg">₺{product.price.toLocaleString()}</span>
                                        {product.salePrice && (
                                            <span className="text-[10px] font-bold text-danger line-through opacity-60">₺{product.salePrice.toLocaleString()}</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-danger animate-pulse'}`} />
                                        <span className={`font-bold ${product.stock === 0 ? 'text-danger' : 'text-foreground'}`}>{product.stock} Adet</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={product.isActive ? "secondary" : "danger"} className="rounded-lg px-3 py-1 text-xs font-bold">
                                        {product.isActive ? 'Yayında' : 'Yayında Değil'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="pr-8 text-right">
                                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        <Link href={`/admin/products/${product.id}`}>
                                            <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-xl hover:text-primary hover:border-primary/40 shadow-sm bg-white">
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
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
