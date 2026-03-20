import { useCart } from "@/context/CartContext";
import { CreditCard, MapPin, ShieldCheck, ChevronRight, Lock, Wallet, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createOrder } from "@/app/actions/orders";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CheckoutPage() {
    const { cartItems, totalAmount, clearCart } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (cartItems.length === 0) {
        return (
            <div className="py-32 max-w-2xl mx-auto px-6">
                <EmptyState 
                    title="Sepetiniz Boş"
                    description="Ödeme yapabilmek için sepetinizde en az bir ürün bulunmalıdır."
                    icon={ShoppingBag}
                    actionLabel="Ürünlere Göz At"
                    actionHref="/products"
                />
            </div>
        );
    }

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true);
        
        // Add cart items to formData
        formData.append("cartData", JSON.stringify(cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        }))));

        const result = await createOrder({ success: false }, formData);

        if (result.success) {
            toast.success(result.message || "Siparişiniz alındı!");
            clearCart();
            router.push(`/orders/${result.id}`);
        } else {
            toast.error(result.error || "Bir hata oluştu.");
        }
        setIsSubmitting(false);
    }

    return (
        <div className="space-y-16 pb-32">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Link href="/cart" className="hover:text-primary transition-colors">Sepet</Link>
                <ChevronRight className="w-4 h-4 opacity-40" />
                <span className="text-foreground font-bold">Ödeme</span>
            </nav>

            <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 space-y-20">
                    {/* Delivery Address */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center">
                                <MapPin className="w-7 h-7 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-3xl font-bold text-foreground tracking-tight">Teslimat Adresi</h2>
                                <p className="text-sm text-muted-foreground font-medium">Siparişinizin gönderileceği adresi belirtin.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface p-8 md:p-12 rounded-card border border-border-subtle shadow-sm">
                            <Input name="firstName" required label="Ad" placeholder="Örn. Ahmet" />
                            <Input name="lastName" required label="Soyad" placeholder="Örn. Yılmaz" />
                            <div className="md:col-span-2">
                                <Input name="email" type="email" required label="E-posta Adresi" placeholder="ahmet@example.com" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-foreground ml-1">Açık Adres</label>
                                <textarea 
                                    name="shippingAddress" 
                                    required 
                                    placeholder="Mahalle, Cadde, Sokak, Kapı No, Daire..." 
                                    rows={4} 
                                    className="w-full bg-muted/50 border border-border-subtle rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none placeholder:text-muted-foreground/40" 
                                />
                            </div>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/5 flex items-center justify-center">
                                <CreditCard className="w-7 h-7 text-emerald-600" />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-3xl font-bold text-foreground tracking-tight">Ödeme Yöntemi</h2>
                                <p className="text-sm text-muted-foreground font-medium">Ödemenizi güvenle yapın.</p>
                            </div>
                        </div>
                        <div className="p-10 md:p-12 rounded-card bg-white border-2 border-primary/20 shadow-sm space-y-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                            
                            <div className="flex items-center justify-between relative">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Wallet className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="font-bold text-foreground text-lg tracking-tight">Kredi / Banka Kartı</span>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-12 h-8 bg-muted rounded border border-border-subtle flex items-center justify-center text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Visa</div>
                                    <div className="w-12 h-8 bg-muted rounded border border-border-subtle flex items-center justify-center text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Master</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                                <div className="md:col-span-2">
                                    <Input label="Kart Üzerindeki İsim" placeholder="Kart sahibinin adı" />
                                </div>
                                <div className="md:col-span-2">
                                    <Input label="Kart Numarası" placeholder="0000 0000 0000 0000" />
                                </div>
                                <Input label="SKT" placeholder="AA / YY" />
                                <Input label="CVC" placeholder="***" type="password" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Order Summary Sidebar */}
                <div className="space-y-8">
                    <div className="bg-zinc-950 rounded-card p-10 text-white shadow-2xl shadow-zinc-950/20 sticky top-32 space-y-10">
                        <h2 className="text-2xl font-bold tracking-tight">Sipariş Özeti</h2>
                        <div className="space-y-6 border-b border-white/10 pb-10">
                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Ara Toplam</span>
                                <span className="font-bold text-white text-lg">₺{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-zinc-400">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-60">Kargo</span>
                                <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] bg-white/5 py-1.5 px-3 rounded-full border border-white/5">Ücretsiz</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="font-bold uppercase tracking-widest text-[10px] text-zinc-500 mb-2">Ödenecek Tutar</span>
                            <span className="text-5xl font-bold text-primary tracking-tighter leading-none">₺{totalAmount.toLocaleString()}</span>
                        </div>
                        
                        <div className="space-y-6">
                            <Button 
                                type="submit"
                                isLoading={isSubmitting}
                                className="w-full h-20 text-lg rounded-2xl gap-3 shadow-2xl shadow-primary/20"
                            >
                                <Lock className="w-5 h-5" /> Siparişi Onayla
                            </Button>
                            
                            <div className="flex items-center justify-center gap-3 text-zinc-500">
                                <ShieldCheck className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">256-Bit SSL Güvenli Alışveriş</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Cart Items Compact Recall */}
                    <div className="bg-white border border-border-subtle rounded-card p-8 space-y-6 shadow-sm">
                        <h3 className="font-bold text-foreground text-sm uppercase tracking-widest opacity-60">Sepetinizdeki Ürünler</h3>
                        <div className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden border border-border-subtle flex-shrink-0">
                                        <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover w-full h-full" />
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h4 className="font-bold text-foreground text-sm truncate">{item.name}</h4>
                                        <p className="text-xs text-muted-foreground font-medium">{item.quantity} Adet × ₺{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
