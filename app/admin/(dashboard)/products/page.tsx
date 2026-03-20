import { db } from "@/lib/db";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
    const products = await (db as any).product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" }
    });

    const categories = await (db as any).category.findMany({
        orderBy: { name: "asc" }
    });

    return <ProductsClient products={products} categories={categories} />;
}
