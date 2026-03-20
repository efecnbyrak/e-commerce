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
        <div className="flex items-center gap-6 p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-24 h-24 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800 group-hover:scale-105 transition-transform">
                <Image src={item.image} alt={item.name} width={96} height={96} className="object-cover w-full h-full" />
            </div>
            
            <div className="flex-1 min-w-0">
                <Link href={`/products/${item.slug}`} className="font-black text-zinc-900 dark:text-white text-lg truncate hover:text-blue-600 transition-colors uppercase italic tracking-tight">
                    {item.name}
                </Link>
                <p className="text-xl font-black text-blue-600 mt-1">₺{item.price.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800 p-2 rounded-2xl">
                <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-colors text-zinc-500"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-colors text-zinc-500"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <button 
                onClick={() => removeFromCart(item.id)}
                className="p-4 text-zinc-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-all"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
