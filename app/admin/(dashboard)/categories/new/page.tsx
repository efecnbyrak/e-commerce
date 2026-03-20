import { db } from "@/lib/db";
import { CategoryForm } from "../components/CategoryForm";
import { Card } from "@/components/ui/card";

export default async function NewCategoryPage() {
    const categories = await (db as any).category.findMany();

    return (
        <div className="space-y-12 pb-32">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Yeni Kategori</h1>
                <p className="text-sm text-muted-foreground font-medium">Sistem hiyerarşisine yeni bir kategori tanımı ekleyin.</p>
            </div>

            <Card className="p-8 md:p-12 border-border-subtle shadow-sm bg-white overflow-hidden">
                <CategoryForm categories={categories} />
            </Card>
        </div>
    );
}
