"use client";

import { useActionState } from "react";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Package, Image as ImageIcon, Tag, Hash, FileText, Check, AlertCircle } from "lucide-react";
import { ActionState } from "@/app/actions/auth";

interface ProductFormProps {
    product?: any;
    categories: any[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
    const action = product ? updateProduct.bind(null, product.id) : createProduct;
    const [state, formAction, isPending] = useActionState(action, { success: false });

    return (
        <form action={formAction} className="space-y-8">
            {state?.error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5" />
                    {state.error}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Ürün Adı</label>
                        <div className="relative">
                            <Package className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                            <input 
                                name="name"
                                defaultValue={product?.name}
                                placeholder="Örn: Premium Pamuklu Tişört"
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Kategori</label>
                        <div className="relative">
                            <Tag className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                            <select 
                                name="categoryId"
                                defaultValue={product?.categoryId}
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none appearance-none"
                                required
                            >
                                <option value="">Kategori Seçin</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Fiyat (TL)</label>
                            <input 
                                type="number"
                                name="price"
                                step="0.01"
                                defaultValue={product?.price}
                                placeholder="0.00"
                                className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">İndirimli Fiyat</label>
                            <input 
                                type="number"
                                name="salePrice"
                                step="0.01"
                                defaultValue={product?.salePrice}
                                placeholder="0.00"
                                className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold text-red-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Stok Miktarı</label>
                        <div className="relative">
                            <Hash className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                            <input 
                                type="number"
                                name="stock"
                                defaultValue={product?.stock}
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Açıklama</label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                            <textarea 
                                name="description"
                                defaultValue={product?.description}
                                rows={6}
                                placeholder="Ürün detaylarını buraya yazın..."
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Görsel URL'leri</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                            <textarea 
                                name="images"
                                defaultValue={product?.images ? JSON.parse(product.images).join('\n') : ''}
                                rows={3}
                                placeholder="Her satıra bir URL gelecek şekilde ekleyin"
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="isFeatured" 
                                defaultChecked={product?.isFeatured}
                                className="w-5 h-5 rounded-lg border-zinc-300 text-blue-600 focus:ring-blue-500" 
                            />
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">Öne Çıkar</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="isActive" 
                                defaultChecked={product?.isActive ?? true}
                                className="w-5 h-5 rounded-lg border-zinc-300 text-blue-600 focus:ring-blue-500" 
                            />
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">Aktif</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <button 
                    disabled={isPending}
                    type="submit"
                    className="w-full md:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all disabled:opacity-50 disabled:scale-95"
                >
                    {isPending ? "Kaydediliyor..." : product ? "Ürünü Güncelle" : "Ürünü Kaydet"}
                </button>
            </div>
        </form>
    );
}
