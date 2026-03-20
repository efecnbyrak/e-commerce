"use client";

import { useActionState } from "react";
import { createCategory, updateCategory } from "@/app/actions/categories";
import { ListTree, Tag, FileText, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CategoryFormProps {
    category?: any;
    categories: any[];
}

export function CategoryForm({ category, categories }: CategoryFormProps) {
    const action = category ? updateCategory.bind(null, category.id) : createCategory;
    const [state, formAction, isPending] = useActionState(action, { success: false });

    return (
        <form action={formAction} className="space-y-10">
            {state?.error && (
                <div className="p-5 bg-danger/5 border border-danger/20 rounded-2xl flex items-center gap-4 text-danger text-sm font-bold animate-in fade-in slide-in-from-top-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {state.error}
                </div>
            )}
            
            <div className="space-y-8">
                <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground ml-1">Kategori Adı</label>
                    <Input 
                        name="name"
                        defaultValue={category?.name}
                        placeholder="Örn: Elektronik, Giyim vb."
                        icon={<Tag className="w-5 h-5" />}
                        required 
                        className="h-14 rounded-2xl bg-white border-border-subtle focus:ring-primary focus:border-primary shadow-sm"
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground ml-1">Üst Kategori</label>
                    <div className="relative group">
                        <ListTree className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                        <select 
                            name="parentId"
                            defaultValue={category?.parentId}
                            className="w-full pl-14 pr-12 h-14 bg-white border border-border-subtle rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none appearance-none shadow-sm cursor-pointer"
                        >
                            <option value="">Yok (Ana Kategori)</option>
                            {categories.filter(c => c.id !== category?.id).map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors" />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-bold text-foreground ml-1">Açıklama</label>
                    <div className="relative group">
                        <FileText className="absolute left-5 top-5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
                        <textarea 
                            name="description"
                            defaultValue={category?.description}
                            rows={5}
                            placeholder="Kategori hakkında kısa bir açıklama..."
                            className="w-full pl-14 pr-6 py-5 bg-white border border-border-subtle rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <Button 
                    isLoading={isPending}
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-12 h-16 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20"
                >
                    {category ? "Kategoriyi Güncelle" : "Kategoriyi Kaydet"}
                </Button>
            </div>
        </form>
    );
}
