import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, Package, ChevronRight, LayoutGrid, List } from "lucide-react";
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
        <div className="space-y-16 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <span>Envanter</span>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">Tüm Ürünler</span>
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tighter">Ürün Yönetimi</h1>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">Mağazanızdaki tüm ürünleri, stok durumlarını ve satış performanslarını buradan yönetin.</p>
                </div>
                <Link href="/admin/products/new">
                    <Button size="lg" className="rounded-2xl px-10 h-16 gap-3 shadow-2xl shadow-primary/30 text-[15px] font-bold">
                        <Plus className="w-5 h-5" /> Yeni Ürün Ekle
                    </Button>
                </Link>
            </div>

            {/* Filter & Search Bar */}
            <Card className="bg-zinc-900/40 border-white/5 backdrop-blur-xl p-6 rounded-[2rem] shadow-2xl flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Ürün adı, kod veya kategori ile ara..." 
                        className="w-full pl-16 pr-6 h-14 bg-white/5 border border-white/5 rounded-2xl text-[15px] font-medium text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    />
                </div>
                <div className="flex gap-4 w-full lg:w-auto">
                    <Button variant="outline" className="h-14 px-8 gap-3 border-white/10 rounded-2xl font-bold text-zinc-400 hover:bg-white/5">
                        <Filter className="w-5 h-5" /> Filtreler
                    </Button>
                    <div className="flex items-center bg-white/5 border border-white/5 rounded-2xl p-1.5 ml-auto lg:ml-0">
                         <div className="p-2.5 bg-primary rounded-xl text-white shadow-lg">
                             <List className="w-4 h-4" />
                         </div>
                         <div className="p-2.5 text-zinc-600 hover:text-white transition-colors cursor-pointer">
                             <LayoutGrid className="w-4 h-4" />
                         </div>
                    </div>
                </div>
            </Card>

            {/* Products Table */}
            <Card className="overflow-hidden border-white/5 bg-zinc-900/40 backdrop-blur-xl shadow-3xl">
                <div className="overflow-x-auto overflow-y-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/5 bg-zinc-950/30 hover:bg-zinc-950/30 h-16">
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pl-10 text-zinc-600">Ürün Bilgisi</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Kategori</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Fiyat</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Stok</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Yayın</TableHead>
                                <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pr-10 text-right text-zinc-600">İşlemler</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center space-y-6">
                                             <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-zinc-700">
                                                 <Package className="w-12 h-12" />
                                             </div>
                                             <div className="space-y-2">
                                                 <h3 className="text-2xl font-bold text-white tracking-tight">Ürün Bulunamadı</h3>
                                                 <p className="text-zinc-500 max-w-xs font-medium">Henüz bir ürün eklemediniz veya arama kriterleri eşleşmiyor.</p>
                                             </div>
                                             <Link href="/admin/products/new">
                                                 <Button className="rounded-xl px-8 h-12">İlk Ürünü Ekle</Button>
                                             </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            {products.map((product: any) => {
                                let productImages = [];
                                try {
                                    productImages = JSON.parse(product.images);
                                } catch (e) {
                                    productImages = [product.images];
                                }
                                
                                return (
                                    <TableRow key={product.id} className="border-white/5 hover:bg-white/5 transition-all duration-300 group">
                                        <TableCell className="pl-10 h-28">
                                            <div className="flex items-center gap-6">
                                                <div className="w-20 h-20 rounded-2xl bg-zinc-950 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                                                    {productImages[0] ? (
                                                        <Image src={productImages[0]} alt={product.name} width={100} height={100} className="object-cover w-full h-full" />
                                                    ) : (
                                                        <Package className="w-8 h-8 text-zinc-800" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col min-w-0 space-y-1.5">
                                                    <span className="font-bold text-[15px] text-white truncate leading-tight group-hover:text-primary transition-colors duration-300">{product.name}</span>
                                                    <div className="flex items-center gap-3">
                                                         <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md border border-white/5">ID: {product.id}</span>
                                                         {product.isFeatured && <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[9px] h-5 rounded-md px-1.5 font-bold uppercase tracking-widest">Öne Çıkan</Badge>}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="rounded-xl px-4 py-1.5 text-[10px] font-bold border-white/10 text-zinc-400 bg-white/5 uppercase tracking-widest">
                                                {product.category.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white text-[19px] tracking-tight">₺{product.price.toLocaleString()}</span>
                                                {product.salePrice && (
                                                    <div className="flex items-center gap-2">
                                                         <span className="text-xs font-bold text-zinc-600 line-through">₺{product.salePrice.toLocaleString()}</span>
                                                         <span className="text-[10px] font-bold text-emerald-500">-%{Math.round(((product.salePrice - product.price) / product.salePrice) * 100)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500 shadow-emerald-500/50 shadow-[0_0_8px]' : product.stock > 0 ? 'bg-amber-500' : 'bg-danger animate-pulse shadow-danger/50 shadow-[0_0_8px]'}`} />
                                                    <span className={`font-bold text-[15px] ${product.stock === 0 ? 'text-danger' : 'text-zinc-300'}`}>{product.stock} <span className="text-[10px] opacity-40 font-medium">BİRİM</span></span>
                                                </div>
                                                <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                                                     <div 
                                                        className={`h-full rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                                        style={{ width: `${Math.min(product.stock * 2, 100)}%` }} 
                                                     />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={product.isActive ? "secondary" : "danger"} className={`rounded-xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest outline-none border-none ${product.isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-danger/10 text-danger'}`}>
                                                {product.isActive ? 'AKTİF' : 'PASİF'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="pr-10 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                <Link href={`/admin/products/${product.id}`}>
                                                    <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all">
                                                        <Edit className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-danger hover:bg-danger/10 hover:border-danger/30 transition-all">
                                                    <Trash2 className="w-5 h-5" />
                                                </Button>
                                                <Button variant="outline" size="sm" className="w-12 h-12 p-0 rounded-2xl bg-white/5 border-white/5 text-zinc-400 hover:text-white transition-all">
                                                    <MoreVertical className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
