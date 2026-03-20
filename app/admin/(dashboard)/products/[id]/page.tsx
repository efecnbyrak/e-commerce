import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductForm } from "../components/ProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    if (isNaN(id)) notFound();

    const [product, categories] = await Promise.all([
        db.product.findUnique({ where: { id } }),
        db.category.findMany()
    ]);

    if (!product) notFound();

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
