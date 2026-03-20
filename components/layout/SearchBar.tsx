"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    useEffect(() => {
        setQuery(searchParams.get("q") || "");
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (query) {
            params.set("q", query);
        } else {
            params.delete("q");
        }
        router.push(`/products?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ürün, kategori veya marka ara..." 
                    className="w-full pl-12 pr-4 h-12 bg-zinc-100 dark:bg-zinc-900 border-transparent focus:border-primary focus:bg-white dark:focus:bg-zinc-800 rounded-xl text-sm font-medium transition-all outline-none border-2"
                />
            </div>
        </form>
    );
}
