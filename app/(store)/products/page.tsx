import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ShoppingBag, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default async function ProductListingPage({ searchParams }: { searchParams: { category?: string } }) {
    const categorySlug = searchParams.category;
    
    const products = await (db as any).product.findMany({
        where: {
            isActive: true,
            ...(categorySlug ? { category: { slug: categorySlug } } : {})
        },
        include: { category: true },
        orderBy: { createdAt: "desc" }
    });

    const categories = await (db as any).category.findMany();

    return (
        <div className="space-y-16 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Tüm Ürünler</h1>
                    <p className="text-muted-foreground font-medium text-lg max-w-lg">
                        {categorySlug 
                            ? `${categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)} kategorimizdeki en seçkin parçaları keşfedin.` 
                            : 'Modern ve stil sahibi koleksiyonumuzla tarzınızı yeniden tanımlayın.'}
                    </p>
                </div>
                
                {/* Category Quick Filters */}
                <div className="flex flex-wrap gap-2">
                    <Link href="/products">
                        <Badge 
                            variant={!categorySlug ? "primary" : "outline"} 
                            className="px-6 py-2.5 text-sm cursor-pointer hover:bg-primary hover:text-white transition-all rounded-full"
                        >
                            Tümü
                        </Badge>
                    </Link>
                    {categories.map((c: any) => (
                        <Link key={c.id} href={`/products?category=${c.slug}`}>
                            <Badge 
                                variant={categorySlug === c.slug ? "primary" : "outline"} 
                                className="px-6 py-2.5 text-sm cursor-pointer hover:bg-primary hover:text-white transition-all rounded-full"
                            >
                                {c.name}
                            </Badge>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="sticky top-24 z-20 bg-background/80 backdrop-blur-xl border border-border-subtle p-6 rounded-card shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="relative flex-1 w-full group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Aradığınız ürünü yazın..." 
                        className="w-full pl-14 pr-6 h-14 bg-muted/50 border-border-subtle rounded-2xl text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-medium placeholder:text-muted-foreground/60"
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="h-14 px-8 gap-3 flex-1 md:flex-none border-border-subtle rounded-2xl font-bold bg-white">
                        <Filter className="w-5 h-5" /> Filtrele
                    </Button>
                    <select className="h-14 px-8 bg-white border border-border-subtle rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer min-w-[180px]">
                        <option>En Yeniler</option>
                        <option>Fiyat: Düşükten Yükseğe</option>
                        <option>Fiyat: Yüksekten Düşüğe</option>
                        <option>En Popüler</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product: any) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                        <Card className="border-none shadow-none bg-transparent h-full">
                            <div className="relative aspect-[3/4] rounded-card overflow-hidden bg-zinc-100 border border-border-subtle shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                {product.images && (
                                    <Image 
                                        src={JSON.parse(product.images)[0] || "/placeholder.png"} 
                                        alt={product.name} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                )}
                                <div className="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                    <Button variant="primary" size="md" className="h-12 w-12 p-0 rounded-xl shadow-xl">
                                        <ShoppingBag className="w-5 h-5" />
                                    </Button>
                                </div>
                                {product.salePrice && (
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="danger" className="rounded-lg px-3">İNDİRİM</Badge>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{product.category.name}</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        <span className="text-xs font-bold text-muted-foreground">4.8</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-foreground text-lg truncate group-hover:text-primary transition-colors tracking-tight">{product.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold text-foreground">₺{product.price.toLocaleString()}</span>
                                    {product.salePrice && (
                                        <span className="text-sm font-medium text-muted-foreground line-through">₺{product.salePrice.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
                <div className="py-40 text-center bg-muted/30 rounded-card border-2 border-dashed border-border-subtle max-w-2xl mx-auto w-full">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Ürün Bulunamadı</h3>
                    <p className="text-muted-foreground font-medium mb-8">Aradığınız kriterlere uygun ürün bulunmamaktadır.</p>
                    <Link href="/products">
                        <Button variant="primary" size="lg" className="rounded-2xl px-12">
                            Tüm Ürünlere Dön
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
