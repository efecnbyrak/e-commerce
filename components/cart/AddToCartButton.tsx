"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
    product: any;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();

    return (
        <Button 
            onClick={() => addToCart(product)}
            className="w-full h-20 text-lg rounded-2xl gap-3 shadow-xl shadow-primary/20"
        >
            <ShoppingBag className="w-5 h-5" />
            Sepete Ekle
        </Button>
    );
}
