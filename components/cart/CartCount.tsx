"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export function CartCount() {
    const { cartItems } = useCart();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        setCount(total);
    }, [cartItems]);

    if (count === 0) return null;

    return (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-zinc-900 text-white shadow-lg animate-in zoom-in-0 duration-300">
            {count}
        </span>
    );
}
