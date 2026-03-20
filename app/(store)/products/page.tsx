import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, ShoppingBag, Star } from "lucide-react";

export default async function ProductListingPage({ searchParams }: { searchParams: { category?: string } }) {
    const categorySlug = searchParams.category;
    
    const products = await db.product.findMany({
        where: {
            isActive: true,
            ...(categorySlug ? { category: { slug: categorySlug } } : {})
        },
        include: { category: true },
        orderBy: { createdAt: "desc" }
    });

    const categories = await db.category.findMany();

    return (
        <div className="space-y-12 pb-24">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Ürün Kataloğu</h1>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-2">
                        {categorySlug ? `${categorySlug} kategorisindeki ürünler` : 'Tüm koleksiyonumuzu keşfedin'}
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    {categories.map((c) => (
                        <Link 
                            key={c.id} 
                            href={`/products?category=${c.slug}`}
                            className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                categorySlug === c.slug 
                                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105' 
                                : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                        >
                            {c.name}
                        </Link>
                    ))}
                    {categorySlug && (
                        <Link href="/products" className="px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:text-zinc-600">
                            Temizle
                        </Link>
                    )}
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-zinc-50/50 dark:bg-zinc-900/30 p-4 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                        type="text" 
                        placeholder="Neye ihtiyacın var? Ara..." 
                        className="w-full pl-14 pr-6 py-5 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-3xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium"
                    />
                </div>
                <button className="px-10 py-5 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-3xl flex items-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-colors">
                    <Filter className="w-4 h-4" /> Sırala
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group">
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-500">
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
                {products.length === 0 && (
                    <div className="col-span-full py-40 text-center bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter italic mb-2">Ürün Bulunamadı</h3>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Aramanızla eşleşen ürün bulunmuyor.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
