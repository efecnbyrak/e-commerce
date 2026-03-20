import { db } from "@/lib/db";
import { CategoryForm } from "../components/CategoryForm";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { ListTree } from "lucide-react";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return (
            <div className="py-20 max-w-2xl mx-auto px-4">
                <EmptyState 
                    title="Geçersiz Kimlik"
                    description="Düzenlemek istediğiniz kategorinin kimlik numarası geçerli bir sayı değil."
                    icon={ListTree}
                    actionLabel="Kategorilere Dön"
                    actionHref="/admin/categories"
                />
            </div>
        );
    }

    const [category, categories] = await Promise.all([
        (db as any).category.findUnique({ where: { id } }),
        (db as any).category.findMany()
    ]);

    if (!category) {
        return (
            <div className="py-20 max-w-2xl mx-auto px-4">
                <EmptyState 
                    title="Kategori Bulunamadı"
                    description="Düzenlemek istediğiniz kategori sistemde mevcut değil veya silinmiş olabilir."
                    icon={ListTree}
                    actionLabel="Kategorilere Dön"
                    actionHref="/admin/categories"
                />
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-32">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Kategoriyi Düzenle</h1>
                <p className="text-sm text-muted-foreground font-medium">#{category.id} numaralı kategorinin hiyerarşisini ve detaylarını güncelleyin.</p>
            </div>

            <Card className="p-8 md:p-12 border-border-subtle shadow-sm bg-white overflow-hidden">
                <CategoryForm category={category} categories={categories} />
            </Card>
        </div>
    );
}
