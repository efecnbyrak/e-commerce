import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

import { ProductFilters } from "./ProductFilters";

interface ProductListProps {
    categorySlug?: string;
    searchQuery?: string;
    sort?: string;
    isSale?: boolean;
    title?: string;
}

export async function ProductList({ categorySlug, searchQuery, sort, isSale, title }: ProductListProps) {
    const products = await (db as any).product.findMany({
        where: {
            isActive: true,
            ...(categorySlug ? { category: { slug: categorySlug } } : {}),
            ...(isSale ? { NOT: { salePrice: null } } : {}),
            ...(searchQuery ? {
                OR: [
                    { name: { contains: searchQuery, mode: "insensitive" } },
                    { description: { contains: searchQuery, mode: "insensitive" } }
                ]
            } : {})
        },
        include: { category: true },
        orderBy: sort === "price-asc" 
            ? { price: "asc" } 
            : sort === "price-desc" 
            ? { price: "desc" } 
            : { createdAt: "desc" }
    });

    const categories = await (db as any).category.findMany();

    const currentCategory = categorySlug ? categories.find((c: any) => c.slug === categorySlug) : null;

    return (
        <div className="space-y-16 pb-32">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-[4rem] bg-zinc-950 p-12 md:p-20 border border-white/5 group">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] group-hover:bg-primary/20 transition-all duration-[2s]" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                    <div className="space-y-6 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-primary/50" />
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Premium Koleksiyon</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85]">
                            {title || (categorySlug 
                                ? currentCategory?.name 
                                : searchQuery 
                                ? `"${searchQuery}"` 
                                : isSale ? "Büyük <br/> İndirim" : "Geleceğin <br/> Modası")}
                        </h1>
                        <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-xl italic">
                            {categorySlug 
                                ? `${currentCategory?.name} dünyasindeki en yeni trendleri ve seçkin parçaları keşfedin.` 
                                : searchQuery 
                                ? `"${searchQuery}" için ${products.length} adet özel ürün listeleniyor.`
                                : isSale ? "En çok tercih edilen markalarda %50'ye varan dev indirimleri kaçırmayın." : 'Sınırları zorlayan tasarımlarımızla stilinizi bir üst seviyeye taşıyın.'}
                        </p>
                    </div>

                    {/* Category Quick Filters */}
                    <div className="flex flex-wrap gap-3 bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 relative z-20">
                        <Link href="/products">
                            <Badge 
                                variant={!categorySlug && !isSale ? "primary" : "outline"} 
                                className="px-8 py-3 text-sm cursor-pointer hover:bg-primary hover:text-white transition-all rounded-2xl border-white/5 font-bold tracking-tight"
                            >
                                Tüm Ürünler
                            </Badge>
                        </Link>
                        {categories.slice(0, 5).map((c: any) => (
                            <Link key={c.id} href={`/products?category=${c.slug}${searchQuery ? `&q=${searchQuery}` : ""}`}>
                                <Badge 
                                    variant={categorySlug === c.slug ? "primary" : "outline"} 
                                    className="px-8 py-3 text-sm cursor-pointer hover:bg-primary hover:text-white transition-all rounded-2xl border-white/5 font-bold tracking-tight"
                                >
                                    {c.name}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter & Search Bar - Replaced with Client Component */}
            <ProductFilters 
                searchQuery={searchQuery} 
                categorySlug={categorySlug} 
                sort={sort} 
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product: any) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group block h-full">
                        <div className="bg-surface rounded-[2.5rem] p-4 border border-border-subtle/50 group-hover:border-primary/20 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden h-full flex flex-col">
                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                                {product.images && (
                                    <Image 
                                        src={JSON.parse(product.images)[0] || "/placeholder.png"} 
                                        alt={product.name} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                )}
                                <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-2">
                                    <WishlistButton productId={product.id} />
                                    <Button variant="primary" size="md" className="h-12 w-12 p-0 rounded-xl shadow-2xl">
                                        <ShoppingBag className="w-5 h-5" />
                                    </Button>
                                </div>
                                {product.salePrice && (
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="danger" className="rounded-lg px-3 py-1 text-[10px] font-bold shadow-lg">İNDİRİM</Badge>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 px-2 space-y-4 flex-1 flex flex-col">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{product.category.name}</span>
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        <span className="text-[10px] font-bold text-muted-foreground">4.9</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-foreground text-lg truncate group-hover:text-primary transition-colors tracking-tight leading-none">{product.name}</h3>
                                <div className="flex items-baseline justify-between pt-4 border-t border-border-subtle/30 mt-auto">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-foreground">₺{product.price.toLocaleString()}</span>
                                        {product.salePrice && (
                                            <span className="text-xs font-medium text-muted-foreground line-through opacity-50">₺{product.salePrice.toLocaleString()}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
                <div className="py-40 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-border-subtle max-w-2xl mx-auto w-full">
                    <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <Search className="w-10 h-10 text-primary/40" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Ürün Bulunamadı</h3>
                    <p className="text-muted-foreground font-medium mb-10 max-w-xs mx-auto text-lg leading-relaxed">Aradığınız kriterlere uygun ürün bulunmamaktadır.</p>
                    <Link href="/products">
                        <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 text-md shadow-lg shadow-primary/20">
                            Tüm Ürünlere Dön
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
