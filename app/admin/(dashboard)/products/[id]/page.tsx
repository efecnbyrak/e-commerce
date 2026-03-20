import { db } from "@/lib/db";
import { ProductForm } from "../components/ProductForm";
import { EmptyState } from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return (
            <div className="py-20 max-w-2xl mx-auto px-4">
                <EmptyState 
                    title="Geçersiz Kimlik"
                    description="Düzenlemek istediğiniz ürünün kimlik numarası geçerli bir sayı değil."
                    icon={Package}
                    actionLabel="Ürün Listesine Dön"
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
            <div className="py-20 max-w-2xl mx-auto px-4">
                <EmptyState 
                    title="Ürün Bulunamadı"
                    description="Düzenlemek istediğiniz ürün sistemde mevcut değil veya silinmiş olabilir."
                    icon={Package}
                    actionLabel="Ürün Listesine Dön"
                    actionHref="/admin/products"
                />
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-32">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Ürünü Düzenle</h1>
                <p className="text-sm text-muted-foreground font-medium">#{product.id} numaralı ürünün detaylarını ve stok bilgisini güncelleyin.</p>
            </div>

            <Card className="p-8 md:p-12 border-border-subtle shadow-sm bg-white overflow-hidden">
                <ProductForm product={product} categories={categories} />
            </Card>
        </div>
    );
}
