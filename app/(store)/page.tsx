import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Star, Zap } from "lucide-react";

export default async function StoreHomePage() {
    const featuredProducts = await db.product.findMany({
        where: { isFeatured: true, isActive: true },
        take: 4,
        include: { category: true }
    });

    const categories = await db.category.findMany({
        take: 6
    });

    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative h-[600px] rounded-[3rem] overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-zinc-900/40 z-10" />
                <Image 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" 
                    alt="Hero" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    priority
                />
                <div className="relative z-20 h-full flex flex-col justify-center px-12 md:px-20 max-w-3xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white">
                        <Zap className="w-3 h-3" /> Yeni Sezon Koleksiyonu
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                        Stilini <br /> <span className="text-blue-500 underline decoration-8 underline-offset-8">Yeniden</span> Tanımla
                    </h1>
                    <p className="text-zinc-300 text-lg font-medium max-w-md">
                        En yeni trendler ve premium kalitedeki ürünlerimizle tarzınızı bir üst seviyeye taşıyın.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <Link href="/products" className="bg-white text-zinc-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-600 hover:text-white transition-all">
                            Hemen Keşfet
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="space-y-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Kategoriler</h2>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">İhtiyacın olan her şey burada</p>
                    </div>
                    <Link href="/categories" className="group flex items-center gap-2 text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-blue-600 transition-colors">
                        Tümünü Gör <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/products?category=${category.slug}`} className="group space-y-4">
                            <div className="aspect-square rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:scale-105 group-hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                                <span className="text-4xl">🏷️</span>
                            </div>
                            <h3 className="text-center font-black text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="space-y-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Öne Çıkanlar</h2>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Haftanın en çok tercih edilenleri</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <Link key={product.id} href={`/products/${product.slug}`} className="group">
                            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                {product.images && (
                                    <Image 
                                        src={JSON.parse(product.images)[0] || "/placeholder.png"} 
                                        alt={product.name} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                )}
                                <div className="absolute top-6 right-6">
                                    <button className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-blue-600 hover:text-white">
                                        <ShoppingBag className="w-5 h-5" />
                                    </button>
                                </div>
                                {product.salePrice && (
                                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                        İNDİRİM
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 space-y-2 px-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{product.category.name}</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        <span className="text-[10px] font-bold text-zinc-400">4.9</span>
                                    </div>
                                </div>
                                <h3 className="font-bold text-zinc-900 dark:text-white text-lg truncate group-hover:text-blue-600 transition-colors uppercase italic tracking-tight">{product.name}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-black text-zinc-900 dark:text-white">₺{product.price.toLocaleString()}</span>
                                    {product.salePrice && (
                                        <span className="text-sm font-bold text-zinc-400 line-through">₺{product.salePrice.toLocaleString()}</span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                    {featuredProducts.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                            <p className="text-zinc-500 font-bold uppercase tracking-widest">Henüz öne çıkan ürün eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Banner Section */}
            <section className="bg-zinc-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                    <div className="max-w-xl space-y-6">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-tight">
                            Bültenimize <br /> <span className="text-blue-500">Abone</span> Olun
                        </h2>
                        <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                            Özel indirimler, yeni gelenler ve stil önerilerinden ilk siz haberdar olun.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <input type="email" placeholder="E-posta adresiniz" className="flex-1 bg-zinc-800 border-none rounded-2xl px-8 py-5 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium" />
                            <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all">
                                Abone Ol
                            </button>
                        </div>
                    </div>
                    <div className="relative w-64 h-64 md:w-80 md:h-80 opacity-20 md:opacity-100 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                        <ShoppingBag className="w-full h-full text-blue-500" />
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </section>
        </div>
    );
}
