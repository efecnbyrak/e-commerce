import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, ListTree, Edit, Trash2, ChevronRight } from "lucide-react";

export default async function CategoriesPage() {
    const categories = await (db as any).category.findMany({
        include: { _count: { select: { products: true } }, parent: true },
        orderBy: { name: "asc" }
    });

    return (
        <div className="space-y-8 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Kategoriler</h1>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Ürün hiyerarşisini düzenleyin</p>
                </div>
                <Link href="/admin/categories/new" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Yeni Kategori
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                        <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight italic">Tüm Kategoriler</h2>
                    </div>
                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                        {categories.map((category) => (
                            <div key={category.id} className="group p-6 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-all flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                        <ListTree className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            {category.parent && (
                                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                                                    {category.parent.name} <ChevronRight className="w-3 h-3" />
                                                </span>
                                            )}
                                        </div>
                                        <span className="font-bold text-zinc-900 dark:text-white text-lg">{category.name}</span>
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">{category._count.products} Ürün</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href={`/admin/categories/${category.id}`} className="p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:text-indigo-600 transition-all">
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button className="p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:text-red-600 transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {categories.length === 0 && (
                            <div className="p-12 text-center text-zinc-500 font-medium">Kategori bulunamadı.</div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-500/20">
                        <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4 text-white">İpucu</h3>
                        <p className="text-indigo-100 text-sm font-medium leading-relaxed">
                            Kategoriler arasında alt-üst ilişkisi kurarak ürünlerinizi daha iyi hiyerarşize edebilirsiniz. Bu hem mağaza yönetimini kolaylaştırır hem de müşterilerinizin aradıklarını bulmasına yardımcı olur.
                        </p>
                    </div>
                    {/* Placeholder for Quick Add Form or Chart */}
                </div>
            </div>
        </div>
    );
}
