"use client";

import { useState, useEffect } from "react";
import { ProductList } from "@/components/products/ProductList";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function FavoritesPage() {
    const [wishlistIds, setWishlistIds] = useState<number[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            const ids = JSON.parse(localStorage.getItem("wishlist") || "[]");
            setWishlistIds(ids);
            
            if (ids.length > 0) {
                // Fetch products from API/Action
                try {
                    const response = await fetch(`/api/products/batch?ids=${ids.join(",")}`);
                    const data = await response.json();
                    setProducts(data);
                } catch (error) {
                    console.error("Failed to load favorites", error);
                }
            }
            setIsLoading(false);
        };

        loadFavorites();
        
        // Listen for changes
        const handleStorage = () => {
            const ids = JSON.parse(localStorage.getItem("wishlist") || "[]");
            setWishlistIds(ids);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    if (isLoading) {
        return (
            <div className="py-32 flex justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (wishlistIds.length === 0) {
        return (
            <div className="py-40 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-border-subtle max-w-2xl mx-auto w-full">
                <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <Heart className="w-10 h-10 text-danger/40" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Henüz Favoriniz Yok</h3>
                <p className="text-muted-foreground font-medium mb-10 max-w-xs mx-auto text-lg leading-relaxed">Beğendiğiniz ürünleri favorilerinize ekleyerek burada görebilirsiniz.</p>
                <Link href="/products">
                    <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 text-md shadow-lg shadow-primary/20">
                        Keşfetmeye Başla
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-16 pb-32">
             <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Favorilerim</h1>
                <p className="text-muted-foreground font-medium text-lg max-w-lg">
                    En sevdiğiniz parçalar sizin için burada toplandı.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product: any) => (
                    <Link key={product.id} href={`/products/${product.slug}`} className="group block h-full">
                        <div className="bg-surface rounded-[2.5rem] p-4 border border-border-subtle/50 relative overflow-hidden h-full flex flex-col">
                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                                {product.images && (
                                    <Image 
                                        src={JSON.parse(product.images)[0] || "/placeholder.png"} 
                                        alt={product.name} 
                                        fill 
                                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                )}
                                <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                    <Button variant="primary" size="md" className="h-12 w-12 p-0 rounded-xl shadow-2xl">
                                        <ShoppingBag className="w-5 h-5" />
                                    </Button>
                                </div>
                                {product.salePrice && (
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="danger" className="rounded-lg px-3 py-1 text-[10px] font-bold shadow-lg">İNDİRİM</Badge>
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 px-2 space-y-4 flex-1 flex flex-col">
                                <h3 className="font-bold text-foreground text-lg truncate group-hover:text-primary transition-colors tracking-tight leading-none">{product.name}</h3>
                                <div className="flex items-baseline justify-between pt-4 border-t border-border-subtle/30 mt-auto">
                                    <span className="text-xl font-bold text-foreground">₺{product.price.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
