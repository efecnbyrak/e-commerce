"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface ProductFiltersProps {
    searchQuery?: string;
    categorySlug?: string;
    sort?: string;
}

export function ProductFilters({ searchQuery, categorySlug, sort }: ProductFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const q = formData.get("q") as string;
        
        const params = new URLSearchParams(searchParams.toString());
        if (q) params.set("q", q);
        else params.delete("q");
        
        startTransition(() => {
            router.push(`/products?${params.toString()}`);
        });
    };

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set("sort", value);
        else params.delete("sort");
        
        startTransition(() => {
            router.push(`${window.location.pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="sticky top-24 z-20 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-border-subtle p-4 md:p-6 rounded-[2rem] shadow-xl flex flex-col md:flex-row gap-4 items-center">
            <form onSubmit={handleSearch} className="relative flex-1 w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                    name="q"
                    defaultValue={searchQuery}
                    type="text" 
                    placeholder="Aradığınız ürünü yazın..." 
                    className="w-full pl-14 pr-6 h-14 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary transition-all outline-none font-medium"
                />
                {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            </form>
            <div className="flex gap-3 w-full md:w-auto">
                <select 
                    onChange={(e) => handleSort(e.target.value)}
                    defaultValue={sort || "newest"}
                    disabled={isPending}
                    className="h-14 px-8 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer min-w-[200px] text-foreground appearance-none shadow-sm disabled:opacity-50"
                >
                    <option value="newest">En Yeniler</option>
                    <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                    <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                </select>
            </div>
        </div>
    );
}
