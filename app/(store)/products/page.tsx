import { ProductList } from "@/components/products/ProductList";

export default async function ProductListingPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ category?: string; q?: string; sort?: string }> 
}) {
    const { category, q, sort } = await searchParams;
    
    return (
        <ProductList 
            categorySlug={category}
            searchQuery={q}
            sort={sort}
        />
    );
}
