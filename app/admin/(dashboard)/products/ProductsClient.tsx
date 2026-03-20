"use client"

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, Package, ChevronRight, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface ProductsClientProps {
    products: any[];
    categories: any[];
}

export default function ProductsClient({ products, categories }: ProductsClientProps) {
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 product.id.toString().includes(searchQuery);
            const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <span>Envanter</span>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">Tüm Ürünler</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tighter">Ürün Yönetimi</h1>
                    <p className="text-zinc-500 font-medium text-base md:text-lg max-w-xl">Mağazanızdaki tüm ürünleri, stok durumlarını ve satış performanslarını buradan yönetin.</p>
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
                        placeholder="Ürün adı veya kod ile ara..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-16 pr-6 h-14 bg-white/5 border border-white/5 rounded-2xl text-[15px] font-medium text-white placeholder:text-zinc-600 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                    />
                </div>
                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="h-14 px-6 bg-white/5 border border-white/5 rounded-2xl text-[15px] font-bold text-zinc-400 focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                    >
                        <option value="all" className="bg-zinc-900">Tüm Kategoriler</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id} className="bg-zinc-900">{cat.name}</option>
                        ))}
                    </select>
                    
                    <div className="flex items-center bg-white/5 border border-white/5 rounded-2xl p-1.5 ml-auto lg:ml-0 shadow-inner">
                         <button 
                            onClick={() => setViewMode("list")}
                            className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === "list" ? "bg-primary text-white shadow-lg" : "text-zinc-600 hover:text-white"}`}
                         >
                             <List className="w-4 h-4" />
                         </button>
                         <button 
                            onClick={() => setViewMode("grid")}
                            className={`p-2.5 rounded-xl transition-all duration-300 ${viewMode === "grid" ? "bg-primary text-white shadow-lg" : "text-zinc-600 hover:text-white"}`}
                         >
                             <LayoutGrid className="w-4 h-4" />
                         </button>
                    </div>
                </div>
            </Card>

            {/* Content Section */}
            {viewMode === "list" ? (
                <Card className="overflow-hidden border-white/5 bg-zinc-900/40 backdrop-blur-xl shadow-3xl">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5 bg-zinc-950/30 hover:bg-zinc-950/30 h-16">
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pl-6 md:pl-10 text-zinc-600">Ürün Bilgisi</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Kategori</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600">Fiyat</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600 text-center">Stok</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] text-zinc-600 text-center">Yayın</TableHead>
                                    <TableHead className="font-bold text-[11px] uppercase tracking-[0.2em] pr-6 md:pr-10 text-right text-zinc-600">İşlemler</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product: any) => {
                                    let productImages = [];
                                    try {
                                        productImages = JSON.parse(product.images);
                                    } catch (e) {
                                        productImages = [product.images];
                                    }
                                    
                                    return (
                                        <TableRow key={product.id} className="border-white/5 hover:bg-white/5 transition-all duration-300 group">
                                            <TableCell className="pl-6 md:pl-10 h-28">
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
                                                    {product.category?.name}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-[19px] tracking-tight">₺{product.price.toLocaleString()}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500 shadow-emerald-500/50 shadow-[0_0_8px]' : product.stock > 0 ? 'bg-amber-500' : 'bg-danger animate-pulse shadow-danger/50 shadow-[0_0_8px]'}`} />
                                                        <span className={`font-bold text-[15px] ${product.stock === 0 ? 'text-danger' : 'text-zinc-300'}`}>{product.stock}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={product.isActive ? "secondary" : "danger"} className={`rounded-xl px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border-none ${product.isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-danger/10 text-danger'}`}>
                                                    {product.isActive ? 'AKTİF' : 'PASİF'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="pr-6 md:pr-10 text-right">
                                                <div className="flex items-center justify-end gap-3 transition-all duration-300">
                                                    <Link href={`/admin/products/${product.id}`}>
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
                                    );
                                })}
                                {filteredProducts.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-40">
                                            <div className="flex flex-col items-center justify-center text-center space-y-6">
                                                 <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-zinc-700">
                                                     <Package className="w-12 h-12" />
                                                 </div>
                                                 <div className="space-y-2">
                                                     <h3 className="text-2xl font-bold text-white tracking-tight">Ürün Bulunamadı</h3>
                                                     <p className="text-zinc-500 max-w-xs font-medium">Arama kriterleri eşleşmiyor.</p>
                                                 </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => {
                         let productImages = [];
                         try {
                             productImages = JSON.parse(product.images);
                         } catch (e) {
                             productImages = [product.images];
                         }
                         return (
                            <Card key={product.id} className="bg-zinc-900/40 border-white/5 backdrop-blur-xl group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 rounded-[2rem] flex flex-col">
                                <div className="aspect-square relative overflow-hidden bg-zinc-950 p-1">
                                    {productImages[0] ? (
                                        <Image src={productImages[0]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-800">
                                            <Package className="w-20 h-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-6 right-6 flex flex-col gap-2">
                                        <Badge variant={product.isActive ? "secondary" : "danger"} className="rounded-xl px-3 py-1 text-[9px] font-bold uppercase tracking-widest border-none">
                                            {product.isActive ? 'AKTİF' : 'PASİF'}
                                        </Badge>
                                        {product.isFeatured && (
                                            <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[9px] rounded-xl px-3 py-1 font-bold uppercase tracking-widest backdrop-blur-md">Öne Çıkan</Badge>
                                        )}
                                    </div>
                                    {/* Action overlay */}
                                    <div className="absolute inset-x-4 bottom-4 flex justify-between gap-3 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                                        <Link href={`/admin/products/${product.id}`} className="flex-1">
                                            <Button className="w-full h-12 rounded-xl font-bold gap-2">
                                                <Edit className="w-4 h-4" /> Düzenle
                                            </Button>
                                        </Link>
                                        <Button variant="danger" className="w-12 h-12 p-0 rounded-xl">
                                            <Trash2 className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-1">
                                                <Badge variant="outline" className="border-white/10 text-primary text-[9px] font-bold uppercase tracking-widest px-0 border-none bg-transparent">
                                                    {product.category?.name}
                                                </Badge>
                                                <h3 className="font-bold text-lg text-white line-clamp-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                                            </div>
                                            <span className="font-bold text-xl text-white tracking-tighter">₺{product.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{product.stock} STOKTA</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest italic">#{product.id}</span>
                                    </div>
                                </div>
                            </Card>
                         )
                    })}
                </div>
            )}
        </div>
    );
}

