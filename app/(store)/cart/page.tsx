"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function CartPage() {
    const { cartItems, totalAmount } = useCart();

    return (
        <div className="space-y-16 pb-32">
            <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">Sepetim</h1>
                <p className="text-muted-foreground font-medium text-lg max-w-lg">Seçtiğiniz ürünleri kontrol edin ve siparişinizi tamamlayın.</p>
            </div>

            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-8">
                        {cartItems.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    
                    <div className="space-y-6">
                        <div className="bg-white border border-border-subtle rounded-card p-10 shadow-sm space-y-10 sticky top-32">
                            <h2 className="text-2xl font-bold text-foreground tracking-tight">Sipariş Özeti</h2>
                            
                            <div className="space-y-6 border-b border-border-subtle pb-10">
                                <div className="flex justify-between items-center text-muted-foreground">
                                    <span className="text-sm font-bold uppercase tracking-wider">Ara Toplam</span>
                                    <span className="font-bold text-foreground">₺{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-muted-foreground">
                                    <span className="text-sm font-bold uppercase tracking-wider">Kargo</span>
                                    <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs bg-emerald-50 px-3 py-1 rounded-full">Ücretsiz</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-end">
                                <span className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground mb-2">Toplam Ödenecek</span>
                                <span className="text-5xl font-bold text-primary tracking-tighter leading-none">₺{totalAmount.toLocaleString()}</span>
                            </div>
                            
                            <div className="space-y-4">
                                <Link href="/checkout">
                                    <Button className="w-full h-20 text-lg rounded-2xl gap-3 shadow-xl shadow-primary/20">
                                        Ödemeye Geç <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                
                                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                                    <Wallet className="w-5 h-5 opacity-40" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">256-Bit SSL Güvenli Ödeme</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-32">
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
