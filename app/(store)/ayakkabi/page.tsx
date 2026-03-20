import { ProductList } from "@/components/products/ProductList";

export default async function AyakkabiPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ q?: string; sort?: string }> 
}) {
    const { q, sort } = await searchParams;
    
    return (
        <ProductList 
            categorySlug="ayakkabi"
            searchQuery={q}
            sort={sort}
        />
    );
}
