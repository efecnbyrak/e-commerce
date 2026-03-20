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
                <div className="p-5 bg-danger/5 border border-danger/20 rounded-2xl flex items-center gap-4 text-danger text-sm font-bold animate-in fade-in slide-in-from-top-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {state.error}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground ml-1">Ürün Adı</label>
                        <Input 
                            name="name"
                            defaultValue={product?.name}
                            placeholder="Örn: Premium Pamuklu Tişört"
                            icon={<Package className="w-5 h-5" />}
                            required 
                            className="h-14 rounded-2xl bg-white border-border-subtle focus:ring-primary focus:border-primary shadow-sm"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground ml-1">Kategori</label>
                        <div className="relative group">
                            <Tag className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                            <select 
                                name="categoryId"
                                defaultValue={product?.categoryId}
                                className="w-full pl-14 pr-12 h-14 bg-white border border-border-subtle rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none appearance-none shadow-sm cursor-pointer"
                                required
                            >
                                <option value="">Kategori Seçin</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-foreground ml-1">Fiyat (TL)</label>
                            <Input 
                                type="number"
                                name="price"
                                step="0.01"
                                defaultValue={product?.price}
                                placeholder="0.00"
                                icon={<Coins className="w-5 h-5" />}
                                required
                                className="h-14 rounded-2xl bg-white border-border-subtle focus:ring-primary focus:border-primary shadow-sm font-bold"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-foreground ml-1">İndirimli Fiyat</label>
                            <Input 
                                type="number"
                                name="salePrice"
                                step="0.01"
                                defaultValue={product?.salePrice}
                                placeholder="0.00"
                                icon={<Percent className="w-5 h-5" />}
                                className="h-14 rounded-2xl bg-white border-border-subtle focus:ring-primary focus:border-primary shadow-sm font-bold text-danger"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground ml-1">Stok Miktarı</label>
                        <Input 
                            type="number"
                            name="stock"
                            defaultValue={product?.stock}
                            icon={<Hash className="w-5 h-5" />}
                            required
                            className="h-14 rounded-2xl bg-white border-border-subtle focus:ring-primary focus:border-primary shadow-sm"
                        />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground ml-1">Açıklama</label>
                        <div className="relative group">
                            <FileText className="absolute left-5 top-5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                            <textarea 
                                name="description"
                                defaultValue={product?.description}
                                rows={6}
                                placeholder="Ürün detaylarını buraya yazın..."
                                className="w-full pl-14 pr-6 py-5 bg-white border border-border-subtle rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none shadow-sm"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-foreground ml-1">Görsel URL'leri</label>
                        <div className="relative group">
                            <ImageIcon className="absolute left-5 top-5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                            <textarea 
                                name="images"
                                defaultValue={product?.images ? JSON.parse(product.images).join('\n') : ''}
                                rows={4}
                                placeholder="Her satıra bir URL gelecek şekilde ekleyin"
                                className="w-full pl-14 pr-6 py-5 bg-white border border-border-subtle rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 p-6 bg-surface border border-border-subtle rounded-2xl shadow-sm">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    name="isFeatured" 
                                    defaultChecked={product?.isFeatured}
                                    className="peer w-6 h-6 rounded-lg border-2 border-border-subtle bg-white text-primary focus:ring-primary transition-all checked:bg-primary" 
                                />
                                <Check className="absolute left-1 top-1 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">Öne Çıkar</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input 
                                    type="checkbox" 
                                    name="isActive" 
                                    defaultChecked={product?.isActive ?? true}
                                    className="peer w-6 h-6 rounded-lg border-2 border-border-subtle bg-white text-primary focus:ring-primary transition-all checked:bg-primary" 
                                />
                                <Check className="absolute left-1 top-1 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                            </div>
                            <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">Aktif Satışta</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-border-subtle">
                <Button 
                    isLoading={isPending}
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-16 h-16 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20"
                >
                    {product ? "Ürünü Güncelle" : "Ürünü Kaydet"}
                </Button>
            </div>
        </form>
    );
}
