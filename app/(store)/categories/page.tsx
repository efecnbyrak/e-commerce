import { db } from "@/lib/db";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
    let categories: any[] = [];
    try {
        categories = await (db as any).category.findMany({
            include: { _count: { select: { products: true } } }
        });
    } catch (error) {
        console.error("Categories Page Fetch Error:", error);
    }

    return (
        <div className="space-y-16 pb-32">
            <div className="text-center space-y-3">
                <h1 className="text-5xl font-bold text-foreground tracking-tight">Kategoriler</h1>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">Sizin için özenle seçilmiş ürün grupları</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {categories.map((category: any) => (
                    <Link 
                        key={category.id} 
                        href={`/products?category=${category.slug}`}
                        className="group relative h-64 sm:h-80 md:h-96 rounded-[2.5rem] overflow-hidden bg-zinc-900/40 backdrop-blur-xl border border-white/5 shadow-2xl transition-all hover:border-primary/30 hover:-translate-y-2"
                    >
                        {/* Background Ornament */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] group-hover:bg-primary/20 transition-all duration-700" />
                        
                        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-1000 opacity-[0.05] group-hover:opacity-10">
                            <ShoppingBag className="w-64 h-64 text-primary" />
                        </div>
                        
                        <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                            <div className="space-y-6 relative z-10">
                                <div className="w-12 h-1.5 bg-primary/30 rounded-full group-hover:w-24 group-hover:bg-primary transition-all duration-700" />
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                                        <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{category._count.products} ÜRÜN</span>
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-[0.8]">{category.name}</h3>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] pt-4 group-hover:text-primary transition-colors">
                                    KOLEKSİYONU KEŞFET <ArrowRight className="w-4 h-4 group-hover:translate-x-3 transition-transform duration-500" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </Link>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="py-20 max-w-2xl mx-auto px-4">
                    <EmptyState 
                        title="Kategori Bulunamadı"
                        description="Henüz hiçbir kategori eklenmemiş. Lütfen daha sonra tekrar kontrol edin."
                        icon={ShoppingBag}
                        actionLabel="Alışverişe Başla"
                        actionHref="/products"
                    />
                </div>
            )}
        </div>
    );
}
