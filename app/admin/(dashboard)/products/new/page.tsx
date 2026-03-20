import { db } from "@/lib/db";
import { ProductForm } from "../components/ProductForm";
import { Card } from "@/components/ui/card";

export default async function NewProductPage() {
    const categories = await (db as any).category.findMany();

    return (
        <div className="space-y-12 pb-32">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Yeni Ürün</h1>
                <p className="text-sm text-muted-foreground font-medium">Envanterinize yeni bir premium ürün ekleyerek satışa başlayın.</p>
            </div>

            <Card className="p-8 md:p-12 border-border-subtle shadow-sm bg-white overflow-hidden">
                <ProductForm categories={categories} />
            </Card>
        </div>
    );
}
