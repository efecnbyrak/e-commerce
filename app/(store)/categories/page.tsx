import { db } from "@/lib/db";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, ArrowRight } from "lucide-react";

export default async function CategoriesPage() {
    const categories = await (db as any).category.findMany({
        include: { _count: { select: { products: true } } }
    });

    return (
        <div className="space-y-16 pb-24">
            <div className="text-center space-y-4">
                <h1 className="text-7xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic leading-none">Kategoriler</h1>
                <p className="text-sm text-zinc-500 font-bold uppercase tracking-[0.3em]">Hizmet verdiğimiz tüm alanlar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categories.map((category: any) => (
                    <Link 
                        key={category.id} 
                        href={`/products?category=${category.slug}`}
                        className="group relative h-96 rounded-[3.5rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 opacity-20 group-hover:opacity-40">
                            <ShoppingBag className="w-40 h-40" />
                        </div>
                        
                        <div className="absolute bottom-10 left-10 z-20 space-y-2">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{category._count.products} ÜRÜN</span>
                            <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">{category.name}</h3>
                            <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest pt-2 group-hover:text-white transition-colors">
                                Keşfet <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="py-40 text-center bg-zinc-50 dark:bg-zinc-900 rounded-[4rem] border-4 border-dashed border-zinc-100 dark:border-zinc-800">
                    <p className="text-2xl font-black text-zinc-400 uppercase italic tracking-tighter">Henüz kategori eklenmemiş.</p>
                </div>
            )}
        </div>
    );
}
