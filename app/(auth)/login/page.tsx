"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, ActionState } from "@/app/actions/auth";
import { Loader2, Lock, User, ChevronRight, AlertCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const initialState: ActionState = {
    error: undefined,
    success: false,
};

export default function LoginPage() {
    const [loginState, formAction, isLoginPending] = useActionState(login, initialState);
    const router = useRouter();

    useEffect(() => {
        if (loginState.success) {
            router.push("/");
            router.refresh();
        }
    }, [loginState.success, router]);

    return (
        <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
            {/* Left Side - Luxury Image & Brand */}
            <div className="relative hidden lg:flex lg:w-1/2 bg-zinc-900 overflow-hidden">
                <Image 
                    src="/auth-bg.png" 
                    alt="Luxury Shopping" 
                    fill 
                    className="object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-[10s]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-20 flex flex-col justify-between z-10">
                    <Link href="/" className="inline-flex items-center gap-4 group">
                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center font-black text-3xl text-white shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform italic">E</div>
                        <span className="text-4xl font-black tracking-tighter uppercase italic text-white">E-Shop</span>
                    </Link>

                    <div className="space-y-6 max-w-lg">
                        <h2 className="text-6xl font-bold text-white tracking-tight leading-tight">
                            Modanın <br /> <span className="text-primary italic">Zirvesine</span> Yolculuk
                        </h2>
                        <p className="text-zinc-300 text-lg font-medium leading-relaxed">
                            Dünyaca ünlü markaların en özel koleksiyonları, size özel fırsatlarla kapınızda. Kalite ve zarafeti tek bir noktada buluşturuyoruz.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 text-white/40 text-sm font-bold uppercase tracking-[0.2em]">
                        <span>© 2024 E-SHOP PREMIUM</span>
                        <span>PRIVACY POLICY</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="w-full max-w-md space-y-12 relative z-10">
                    <div className="space-y-4">
                        <Link href="/" className="lg:hidden inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-8">
                            <ArrowLeft className="w-4 h-4" /> Geri Dön
                        </Link>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tighter leading-none">Hoş Gelmişsiniz.</h1>
                        <p className="text-muted-foreground font-medium text-base md:text-lg italic">Hesabınıza giriş yaparak ayrıcalıklı dünyaya adım atın.</p>
                    </div>

                    <form action={formAction} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] ml-1">E-Posta Adresiniz</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full pl-16 pr-6 py-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-border-subtle focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-semibold placeholder:text-zinc-300 shadow-sm"
                                        placeholder="ornek@shop.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Şifreniz</label>
                                    <Link href="#" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Şifremi Unuttum</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        className="w-full pl-16 pr-6 py-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-border-subtle focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-semibold placeholder:text-zinc-300 shadow-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        {loginState?.error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold animate-pulse">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {loginState.error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <Button
                                type="submit"
                                isLoading={isLoginPending}
                                className="w-full h-20 text-lg rounded-[2rem] gap-3 shadow-2xl shadow-primary/20"
                            >
                                Oturum Aç <ChevronRight className="w-5 h-5" />
                            </Button>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border-subtle"></div></div>
                                <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.4em]"><span className="bg-zinc-50 dark:bg-zinc-950 px-6 text-muted-foreground">Veya</span></div>
                            </div>

                            <Link href="/register">
                                <Button variant="outline" className="w-full h-20 text-xs uppercase tracking-[0.2em] font-bold rounded-[2rem] border-2 border-border-subtle">
                                    Yeni Hesap Oluştur
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
