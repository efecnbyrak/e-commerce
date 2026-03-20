import { db } from "@/lib/db";
import { CategoryForm } from "../components/CategoryForm";
import { EmptyState } from "@/components/ui/empty-state";
import { ListTree } from "lucide-react";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return (
            <div className="py-12 max-w-2xl mx-auto">
                <EmptyState 
                    title="Geçersiz ID"
                    description="Geçersiz kategori kimliği sağlandı."
                    icon={ListTree}
                    actionLabel="Kategorilere Dön"
                    actionHref="/admin/categories"
                />
            </div>
        );
    }

    const [category, categories] = await Promise.all([
        db.category.findUnique({ where: { id } }),
        db.category.findMany()
    ]);

    if (!category) {
        return (
            <div className="py-12 max-w-2xl mx-auto">
                <EmptyState 
                    title="Kategori Bulunamadı"
                    description="Düzenlemek istediğiniz kategori mevcut değil."
                    icon={ListTree}
                    actionLabel="Kategorilere Dön"
                    actionHref="/admin/categories"
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-24 max-w-4xl">
            <div>
                <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Kategoriyi Düzenle</h1>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Kategori hiyerarşisini güncelleyin</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl p-8 md:p-12">
                <CategoryForm category={category} categories={categories} />
            </div>
        </div>
    );
}
