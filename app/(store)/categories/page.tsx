import { db } from "@/lib/db";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, ArrowRight } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
    const categories = await (db as any).category.findMany({
        include: { _count: { select: { products: true } } }
    });

    return (
        <div className="space-y-16 pb-32">
            <div className="text-center space-y-3">
                <h1 className="text-5xl font-bold text-foreground tracking-tight">Kategoriler</h1>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">Sizin için özenle seçilmiş ürün grupları</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categories.map((category: any) => (
                    <Link 
                        key={category.id} 
                        href={`/products?category=${category.slug}`}
                        className="group relative h-96 rounded-card overflow-hidden bg-white border border-border-subtle shadow-card transition-all hover:shadow-2xl hover:-translate-y-2"
                    >
                        {/* Background Ornament */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors" />
                        
                        <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 opacity-[0.03] group-hover:opacity-10">
                            <ShoppingBag className="w-48 h-48" />
                        </div>
                        
                        <div className="absolute inset-0 p-12 flex flex-col justify-end">
                            <div className="space-y-4">
                                <div className="w-12 h-1 bg-primary/20 rounded-full group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{category._count.products} ÜRÜN MEVCUT</span>
                                    <h3 className="text-3xl font-bold text-foreground leading-tight tracking-tight">{category.name}</h3>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest pt-2 group-hover:text-primary transition-colors">
                                    ŞİMDİ İNCELE <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
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
