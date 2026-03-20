"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { EmptyState } from "@/components/ui/empty-state";

export default function CartPage() {
    const { cartItems, totalAmount } = useCart();

    return (
        <div className="space-y-12 pb-24">
            <div className="space-y-2">
                <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Sepetim</h1>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Seçtiğiniz ürünleri kontrol edin</p>
            </div>

            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-zinc-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-zinc-900/30 space-y-8 sticky top-32">
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Sipariş Özeti</h2>
                            
                            <div className="space-y-4 border-b border-white/10 pb-8">
                                <div className="flex justify-between text-zinc-400 font-medium">
                                    <span className="text-xs uppercase tracking-widest font-black">Ara Toplam</span>
                                    <span className="font-bold">₺{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-zinc-400 font-medium">
                                    <span className="text-xs uppercase tracking-widest font-black">Kargo</span>
                                    <span className="text-emerald-400 font-black">ÜCRETSİZ</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-baseline">
                                <span className="font-black uppercase tracking-widest text-[10px] text-zinc-400">Toplam</span>
                                <span className="text-5xl font-black text-blue-500 tracking-tighter">₺{totalAmount.toLocaleString()}</span>
                            </div>
                            
                            <Link 
                                href="/checkout" 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
                            >
                                Ödemeye Geç <ArrowRight className="w-5 h-5" />
                            </Link>
                            
                            <div className="pt-4 flex items-center justify-center gap-3 opacity-50">
                                <Wallet className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Güvenli Ödeme Altaypısı</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-24">
                    <EmptyState 
                        title="Sepetiniz Boş"
                        description="Henüz sepetinize bir ürün eklememişsiniz. Harika fırsatları kaçırmayın!"
                        icon={ShoppingBag}
                        actionLabel="Alışverişe Başla"
                        actionHref="/products"
                    />
                </div>
            )}
        </div>
    );
}
