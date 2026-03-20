import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Trash2, MoreVertical, Package } from "lucide-react";
import Image from "next/image";

export default async function ProductsPage() {
    const products = await db.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-8 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Ürünler</h1>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Envanterdeki tüm ürünleri yönetin</p>
                </div>
                <Link href="/admin/products/new" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Yeni Ürün
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-4 justify-between bg-zinc-50/50 dark:bg-zinc-800/20">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input 
                            type="text" 
                            placeholder="Ürün adı, kod veya kategori ara..." 
                            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="px-6 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:bg-zinc-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filtrele
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-800/40">
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Ürün Bilgisi</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Kategori</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Fiyat</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Stok</th>
                                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Durum</th>
                                <th className="px-8 py-6 text-right text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-sm">
                            {products.map((product) => (
                                <tr key={product.id} className="group hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
                                                {product.images ? (
                                                    <Image src={JSON.parse(product.images)[0] || "/placeholder.png"} alt={product.name} width={64} height={64} className="object-cover w-full h-full" />
                                                ) : (
                                                    <Package className="w-6 h-6 text-zinc-400" />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-bold text-zinc-900 dark:text-white truncate text-base">{product.name}</span>
                                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">#{product.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-lg text-zinc-900 dark:text-white">₺{product.price.toLocaleString()}</span>
                                            {product.salePrice && (
                                                <span className="text-[10px] font-bold text-red-500 line-through">₺{product.salePrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`} />
                                            <span className="font-black text-zinc-700 dark:text-zinc-300">{product.stock} Adet</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            product.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {product.isActive ? 'Aktif' : 'Pasif'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/admin/products/${product.id}`} className="p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button className="p-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:text-red-600 hover:border-red-200 transition-all shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
