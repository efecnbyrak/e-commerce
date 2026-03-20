"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

interface AddToCartButtonProps {
    product: any;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();

    return (
        <button 
            onClick={() => addToCart(product)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
            <ShoppingBag className="w-5 h-5" />
            Sepete Ekle
        </button>
    );
}
