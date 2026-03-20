import { ProductList } from "@/components/products/ProductList";

export default async function CategoryPage({ 
    params,
    searchParams 
}: { 
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ q?: string; sort?: string }>;
}) {
    const { slug } = await params;
    const { q, sort } = await searchParams;
    
    return (
        <ProductList 
            categorySlug={slug}
            searchQuery={q}
            sort={sort}
        />
    );
}
