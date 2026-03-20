"use client";

import { useCart, CartItem as CartItemType } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex items-center gap-8 p-8 bg-white rounded-card border border-border-subtle shadow-sm hover:shadow-card-hover transition-all group">
            <div className="w-28 h-28 rounded-2xl bg-zinc-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-border-subtle group-hover:scale-105 transition-transform">
                <Image src={item.image} alt={item.name} width={112} height={112} className="object-cover w-full h-full" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-2">
                <Link href={`/products/${item.slug}`} className="font-bold text-foreground text-xl truncate hover:text-primary transition-colors tracking-tight">
                    {item.name}
                </Link>
                <p className="text-2xl font-bold text-primary">₺{item.price.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-2xl border border-border-subtle">
                <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-3 hover:bg-white rounded-xl transition-all text-muted-foreground hover:text-foreground hover:shadow-sm"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-3 hover:bg-white rounded-xl transition-all text-muted-foreground hover:text-foreground hover:shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <button 
                onClick={() => removeFromCart(item.id)}
                className="p-5 text-muted-foreground hover:text-danger hover:bg-danger/5 rounded-2xl transition-all"
            >
                <Trash2 className="w-6 h-6" />
            </button>
        </div>
    );
}
