import { db } from "@/lib/db";
import Image from "next/image";
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { EmptyState } from "@/components/ui/empty-state";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const product = await (db as any).product.findUnique({
        where: { slug: params.slug },
        include: { category: true }
    });

    if (!product || !(product as any).isActive) {
        return (
            <div className="py-24 max-w-2xl mx-auto">
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
        <div className="space-y-16 pb-24">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/products" className="hover:text-blue-600 transition-colors">Ürünler</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href={`/products?category=${product.category.slug}`} className="hover:text-blue-600 transition-colors">{product.category.name}</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-900 dark:text-white">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Image Gallery */}
                <div className="space-y-6">
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl group">
                        <Image 
                            src={images[0]} 
                            alt={product.name} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {images.slice(1).map((img: string, i: number) => (
                            <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-blue-500 transition-all opacity-60 hover:opacity-100">
                                <Image src={img} alt={`${product.name} ${i}`} width={150} height={150} className="object-cover w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                                {product.category.name}
                            </span>
                            <div className="flex items-center gap-1 ml-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                                <span className="text-xs font-bold text-zinc-400 ml-2">(128 Değerlendirme)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic leading-[0.9]">
                            {product.name}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium leading-relaxed max-w-xl">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">₺{product.price.toLocaleString()}</span>
                            {product.salePrice && (
                                <span className="text-2xl font-bold text-zinc-400 line-through">₺{product.salePrice.toLocaleString()}</span>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Stokta Var ({product.stock} Adet)</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <AddToCartButton product={product} />
                        <button className="p-6 rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all shadow-sm">
                            <Star className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                                <Truck className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">Hızlı Teslimat</h4>
                                <p className="text-xs text-zinc-500 font-medium">24 saat içinde kargoda</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                                <RotateCcw className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">Kolay İade</h4>
                                <p className="text-xs text-zinc-500 font-medium">14 gün ücretsiz iade</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">Güvenli Ödeme</h4>
                                <p className="text-xs text-zinc-500 font-medium">256-bit SSL koruması</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
