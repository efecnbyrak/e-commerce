"use client";

import { useActionState } from "react";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Package, Image as ImageIcon, Tag, Hash, FileText, Check, AlertCircle, ChevronDown, Coins, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductFormProps {
    product?: any;
    categories: any[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
    const action = product ? updateProduct.bind(null, product.id) : createProduct;
    const [state, formAction, isPending] = useActionState(action, { success: false });

    return (
        <form action={formAction} className="space-y-12">
            {state?.error && (
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {state.error}
                </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-10">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Ürün Adı</label>
                        <Input 
                            name="name"
                            defaultValue={product?.name}
                            placeholder="Örn: Premium Pamuklu Tişört"
                            icon={<Package className="w-5 h-5" />}
                            required 
                            className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary focus:border-primary shadow-xl text-white placeholder:text-zinc-700"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Kategori</label>
                        <div className="relative group">
                            <Tag className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-primary transition-colors pointer-events-none" />
                            <select 
                                name="categoryId"
                                defaultValue={product?.categoryId}
                                className="w-full pl-16 pr-12 h-16 bg-zinc-950/50 border border-white/5 rounded-[1.25rem] text-[15px] font-medium text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none appearance-none shadow-xl cursor-pointer"
                                required
                            >
                                <option value="" className="bg-zinc-950">Kategori Seçin</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id} className="bg-zinc-950">{c.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 pointer-events-none group-hover:text-primary transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Normal Fiyat (TL)</label>
                            <Input 
                                type="number"
                                name="price"
                                step="0.01"
                                defaultValue={product?.price}
                                placeholder="0.00"
                                icon={<Coins className="w-5 h-5" />}
                                required
                                className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary focus:border-primary shadow-xl text-white font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">İndirimli Fiyat (Opsiyonel)</label>
                            <Input 
                                type="number"
                                name="salePrice"
                                step="0.01"
                                defaultValue={product?.salePrice}
                                placeholder="0.00"
                                icon={<Percent className="w-5 h-5 text-red-500" />}
                                className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary focus:border-primary shadow-xl text-red-400 font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Stok Miktarı</label>
                        <Input 
                            type="number"
                            name="stock"
                            defaultValue={product?.stock}
                            icon={<Hash className="w-5 h-5" />}
                            required
                            className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary focus:border-primary shadow-xl text-white"
                        />
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Ürün Açıklaması</label>
                        <div className="relative group">
                            <FileText className="absolute left-6 top-6 w-5 h-5 text-zinc-700 group-focus-within:text-primary transition-colors pointer-events-none" />
                            <textarea 
                                name="description"
                                defaultValue={product?.description}
                                rows={6}
                                placeholder="Ürün detaylarını buraya yazın..."
                                className="w-full pl-16 pr-8 py-6 bg-zinc-950/50 border border-white/5 rounded-[1.5rem] text-[15px] font-medium text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none shadow-xl min-h-[180px]"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Görsel URL'leri (Her Satıra Bir Tane)</label>
                        <div className="relative group">
                            <ImageIcon className="absolute left-6 top-6 w-5 h-5 text-zinc-700 group-focus-within:text-primary transition-colors pointer-events-none" />
                            <textarea 
                                name="images"
                                defaultValue={product?.images ? JSON.parse(product.images).join('\n') : ''}
                                rows={4}
                                placeholder="https://example.com/image1.jpg"
                                className="w-full pl-16 pr-8 py-6 bg-zinc-950/50 border border-white/5 rounded-[1.5rem] text-[15px] font-medium text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none shadow-xl"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-12 p-8 bg-white/5 border border-white/5 rounded-[1.5rem] shadow-inner">
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    name="isFeatured" 
                                    defaultChecked={product?.isFeatured}
                                    className="peer w-7 h-7 rounded-xl border-2 border-white/10 bg-zinc-950 text-primary focus:ring-primary transition-all checked:bg-primary checked:border-primary" 
                                />
                                <Check className="absolute left-1.5 top-1.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                            <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">Öne Çıkar</span>
                        </label>
                        <label className="flex items-center gap-4 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    name="isActive" 
                                    defaultChecked={product?.isActive ?? true}
                                    className="peer w-7 h-7 rounded-xl border-2 border-white/10 bg-zinc-950 text-primary focus:ring-primary transition-all checked:bg-primary checked:border-primary" 
                                />
                                <Check className="absolute left-1.5 top-1.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                            <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">Yayına Al</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4 text-zinc-500">
                    <AlertCircle className="w-5 h-5 text-primary animate-pulse" />
                    <p className="text-xs font-medium">Formu kaydettiğinizde tüm bilgiler anında güncellenecektir.</p>
                </div>
                <Button 
                    isLoading={isPending}
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-20 h-16 rounded-[1.25rem] text-[15px] font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    {product ? "Değişiklikleri Güncelle" : "Ürünü Mağazaya Ekle"}
                </Button>
            </div>
        </form>
    );
}
