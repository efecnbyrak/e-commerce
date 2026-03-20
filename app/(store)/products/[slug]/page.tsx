import { db } from "@/lib/db";
import Image from "next/image";
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, ChevronRight, Search, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WishlistButton } from "@/components/wishlist/WishlistButton";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await (db as any).product.findUnique({
        where: { slug },
        include: { category: true }
    });

    if (!product || !(product as any).isActive) {
        return (
            <div className="py-32 max-w-2xl mx-auto px-6">
                <EmptyState 
                    title="Ürün Bulunamadı"
                    description="Aradığınız ürün stokta yok veya yayından kaldırılmış olabilir."
                    icon={Search}
                    actionLabel="Tüm Ürünlere Dön"
                    actionHref="/products"
                />
            </div>
        );
    }

    const images = product.images ? JSON.parse(product.images) : ["/placeholder.png"];

    return (
        <div className="space-y-16 pb-32">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <Link href="/products" className="hover:text-primary transition-colors">Ürünler</Link>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <Link href={`/products?category=${product.category.slug}`} className="hover:text-primary transition-colors">
                    {product.category.name}
                </Link>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span className="text-foreground font-bold truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Image Gallery - Premium Feel */}
                <div className="space-y-6">
                    <div className="relative aspect-square rounded-card overflow-hidden bg-zinc-100 border border-border-subtle shadow-sm group">
                        <Image 
                            src={images[0]} 
                            alt={product.name} 
                            fill 
                            className="object-cover transition-transform duration-1000"
                            priority
                        />
                        {product.salePrice && (
                            <div className="absolute top-6 left-6">
                                <Badge variant="danger" className="px-4 py-1.5 text-xs font-bold rounded-lg shadow-lg">
                                    İNDİRİM
                                </Badge>
                            </div>
                        )}
                        <button className="absolute top-6 right-6 p-3 rounded-full bg-white/80 backdrop-blur-md text-foreground hover:text-danger hover:bg-white transition-all shadow-xl">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>
                    
                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img: string, i: number) => (
                            <div key={i} className={`aspect-square rounded-2xl overflow-hidden bg-zinc-100 border-2 cursor-pointer transition-all ${i === 0 ? 'border-primary' : 'border-border-subtle opacity-60 hover:opacity-100 hover:border-primary/40'}`}>
                                <Image src={img} alt={`${product.name} ${i}`} width={200} height={200} className="object-cover w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Link href={`/products?category=${product.category.slug}`}>
                                    <span className="text-sm font-bold text-primary uppercase tracking-widest hover:underline cursor-pointer">
                                        {product.category.name}
                                    </span>
                                </Link>
                                <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
                                {product.name}
                            </h1>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-muted-foreground border-l border-border-subtle pl-6">
                                4.9 <span className="font-medium">(128 Değerlendirme)</span>
                            </span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-baseline gap-6">
                            <span className="text-6xl font-bold text-foreground tracking-tight">₺{product.price.toLocaleString()}</span>
                            {product.salePrice && (
                                <span className="text-2xl font-medium text-muted-foreground line-through">₺{product.salePrice.toLocaleString()}</span>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Stokta Var ({product.stock} Adet)</span>
                        </div>

                        <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                            {product.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <div className="flex-1">
                            <AddToCartButton product={product} />
                        </div>
                        <WishlistButton productId={product.id} variant="full" />
                    </div>

                    {/* Features List - Premium Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border-subtle">
                        {[
                            { icon: Truck, title: "Hızlı Teslimat", color: "text-primary", bg: "bg-primary/5" },
                            { icon: RotateCcw, title: "Kolay İade", color: "text-emerald-500", bg: "bg-emerald-500/5" },
                            { icon: ShieldCheck, title: "Güvenli Ödeme", color: "text-amber-500", bg: "bg-amber-500/5" }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl border border-border-subtle bg-surface/50 group hover:shadow-sm transition-all">
                                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">{feature.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
