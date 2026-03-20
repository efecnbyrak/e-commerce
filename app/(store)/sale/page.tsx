import { ProductList } from "@/components/products/ProductList";

export default async function SalePage({ 
    searchParams 
}: { 
    searchParams: Promise<{ q?: string; sort?: string }> 
}) {
    const { q, sort } = await searchParams;
    
    return (
        <ProductList 
            isSale={true}
            searchQuery={q}
            sort={sort}
            title="İndirimdekiler"
        />
    );
}
