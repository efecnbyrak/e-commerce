"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface WishlistButtonProps {
    productId: number;
    initialIsWishlisted?: boolean;
    className?: string;
    variant?: "icon" | "full";
}

export function WishlistButton({ 
    productId, 
    initialIsWishlisted = false,
    className,
    variant = "icon"
}: WishlistButtonProps) {
    const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
    const [isLoading, setIsLoading] = useState(false);

    // Load from local storage for guest users or sync with server later
    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsWishlisted(wishlist.includes(productId));
    }, [productId]);

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        setIsLoading(true);
        try {
            const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
            let newWishlist;
            
            if (wishlist.includes(productId)) {
                newWishlist = wishlist.filter((id: number) => id !== productId);
                toast.success("Favorilerimden çıkarıldı");
            } else {
                newWishlist = [...wishlist, productId];
                toast.success("Favorilerime eklendi");
            }
            
            localStorage.setItem("wishlist", JSON.stringify(newWishlist));
            setIsWishlisted(newWishlist.includes(productId));
            
            // Trigger storage event for other components
            window.dispatchEvent(new Event("storage"));
        } catch (error) {
            toast.error("Bir hata oluştu");
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === "full") {
        return (
            <Button 
                variant="outline" 
                onClick={toggleWishlist}
                disabled={isLoading}
                className={cn("h-20 rounded-2xl px-8 border-border-subtle group/heart", className)}
            >
                <Heart className={cn("w-6 h-6 transition-all", isWishlisted ? "fill-danger text-danger scale-110" : "text-foreground group-hover/heart:text-danger")} />
            </Button>
        );
    }

    return (
        <button 
            onClick={toggleWishlist}
            disabled={isLoading}
            className={cn(
                "p-3 rounded-full bg-white/80 backdrop-blur-md shadow-xl transition-all hover:scale-110 group/heart",
                className
            )}
        >
            <Heart className={cn("w-5 h-5 transition-all", isWishlisted ? "fill-danger text-danger scale-110" : "text-foreground group-hover/heart:text-danger")} />
        </button>
    );
}
