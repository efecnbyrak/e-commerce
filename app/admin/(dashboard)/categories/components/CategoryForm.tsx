"use client";

import { useActionState } from "react";
import { createCategory, updateCategory } from "@/app/actions/categories";
import { ListTree, Tag, FileText, AlertCircle } from "lucide-react";
import { ActionState } from "@/app/actions/auth";

interface CategoryFormProps {
    category?: any;
    categories: any[];
}

export function CategoryForm({ category, categories }: CategoryFormProps) {
    const action = category ? updateCategory.bind(null, category.id) : createCategory;
    const [state, formAction, isPending] = useActionState(action, { success: false });

    return (
        <form action={formAction} className="space-y-8">
            {state?.error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5" />
                    {state.error}
                </div>
            )}
            
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Kategori Adı</label>
                    <div className="relative">
                        <Tag className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                        <input 
                            name="name"
                            defaultValue={category?.name}
                            placeholder="Örn: Elektronik, Giyim vb."
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                            required 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Üst Kategori</label>
                    <div className="relative">
                        <ListTree className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                        <select 
                            name="parentId"
                            defaultValue={category?.parentId}
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
                        >
                            <option value="">Yok (Ana Kategori)</option>
                            {categories.filter(c => c.id !== category?.id).map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-2">Açıklama</label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-4 w-5 h-5 text-zinc-400" />
                        <textarea 
                            name="description"
                            defaultValue={category?.description}
                            rows={4}
                            placeholder="Kategori hakkında kısa bir açıklama..."
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6">
                <button 
                    disabled={isPending}
                    type="submit"
                    className="w-full md:w-auto px-12 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:scale-95"
                >
                    {isPending ? "Kaydediliyor..." : category ? "Kategoriyi Güncelle" : "Kategoriyi Kaydet"}
                </button>
            </div>
        </form>
    );
}
