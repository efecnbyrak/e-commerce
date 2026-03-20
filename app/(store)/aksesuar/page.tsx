import { ProductList } from "@/components/products/ProductList";

export default async function AksesuarPage({ 
    searchParams 
}: { 
    searchParams: Promise<{ q?: string; sort?: string }> 
}) {
    const { q, sort } = await searchParams;
    
    return (
        <ProductList 
            categorySlug="aksesuar"
            searchQuery={q}
            sort={sort}
        />
    );
}
