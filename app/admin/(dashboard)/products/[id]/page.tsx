import { db } from "@/lib/db";
import { ProductForm } from "../components/ProductForm";
import { EmptyState } from "@/components/ui/empty-state";
import { Package } from "lucide-react";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return (
            <div className="py-12 max-w-2xl mx-auto">
                <EmptyState 
                    title="Geçersiz ID"
                    description="Geçersiz ürün kimliği sağlandı."
                    icon={Package}
                    actionLabel="Ürünlere Dön"
                    actionHref="/admin/products"
                />
            </div>
        );
    }

    const [product, categories] = await Promise.all([
        (db as any).product.findUnique({ where: { id } }),
        (db as any).category.findMany()
    ]);

    if (!product) {
        return (
            <div className="py-12 max-w-2xl mx-auto">
                <EmptyState 
                    title="Ürün Bulunamadı"
                    description="Düzenlemek istediğiniz ürün mevcut değil."
                    icon={Package}
                    actionLabel="Ürünlere Dön"
                    actionHref="/admin/products"
                />
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-24 max-w-4xl">
            <div>
                <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Ürünü Düzenle</h1>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Ürün bilgilerini güncelleyin</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-xl p-8 md:p-12">
                <ProductForm product={product} categories={categories} />
            </div>
        </div>
    );
}
