"use client";

import { useActionState } from "react";
import { createCategory, updateCategory } from "@/app/actions/categories";
import { ActionState } from "@/app/actions/auth";
import { ListTree, Tag, FileText, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CategoryFormProps {
    category?: any;
    categories: any[];
}

export function CategoryForm({ category, categories }: CategoryFormProps) {
    const action = category ? updateCategory.bind(null, category.id) : createCategory;
    const initialState: ActionState = { success: false };
    const [state, formAction, isPending] = useActionState(action, initialState);

    return (
        <form action={formAction} className="space-y-12">
            {state?.error && (
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {state.error}
                </div>
            )}
            
            <div className="space-y-10">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Kategori Adı</label>
                    <Input 
                        name="name"
                        defaultValue={category?.name}
                        placeholder="Örn: Elektronik, Giyim vb."
                        icon={<Tag className="w-5 h-5 text-zinc-700" />}
                        required 
                        className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary shadow-xl text-white placeholder:text-zinc-800"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Üst Kategori</label>
                    <div className="relative group">
                        <ListTree className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-primary transition-colors pointer-events-none" />
                        <select 
                            name="parentId"
                            defaultValue={category?.parentId}
                            className="w-full pl-16 pr-12 h-16 bg-zinc-950/50 border border-white/5 rounded-[1.25rem] text-[15px] font-medium text-white focus:ring-2 focus:ring-primary transition-all outline-none appearance-none shadow-xl cursor-pointer"
                        >
                            <option value="" className="bg-zinc-950">Yok (Ana Kategori)</option>
                            {categories.filter(c => c.id !== category?.id).map((c) => (
                                <option key={c.id} value={c.id} className="bg-zinc-950">{c.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 pointer-events-none group-hover:text-primary transition-colors" />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Açıklama</label>
                    <div className="relative group">
                        <FileText className="absolute left-6 top-6 w-5 h-5 text-zinc-700 group-focus-within:text-primary transition-colors pointer-events-none" />
                        <textarea 
                            name="description"
                            defaultValue={category?.description}
                            rows={5}
                            placeholder="Kategori hakkında kısa bir açıklama..."
                            className="w-full pl-16 pr-8 py-6 bg-zinc-950/50 border border-white/5 rounded-[1.5rem] text-[15px] font-medium text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none shadow-xl min-h-[140px]"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex justify-end">
                <Button 
                    isLoading={isPending}
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-16 h-16 rounded-[1.25rem] text-[15px] font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                    {category ? "Kategoriyi Güncelle" : "Kategoriyi Kaydet"}
                </Button>
            </div>
        </form>
    );
}
