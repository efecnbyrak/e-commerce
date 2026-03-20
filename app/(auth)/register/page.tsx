"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register, ActionState } from "@/app/actions/auth";
import { Loader2, Lock, User, ChevronRight, AlertCircle, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const initialState: ActionState = {
    error: undefined,
    success: false,
};

export default function RegisterPage() {
    const [registerState, formAction, isPending] = useActionState(register, initialState);
    const router = useRouter();

    useEffect(() => {
        if (registerState.success) {
            router.push("/login?message=Kayıt başarılı, lütfen giriş yapın.");
        }
    }, [registerState.success, router]);

    return (
        <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
            {/* Left Side - Luxury Image & Brand (Mirrored from Login) */}
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
                            Aramıza <br /> <span className="text-primary italic">Hoş Geldiniz</span>
                        </h2>
                        <p className="text-zinc-300 text-lg font-medium leading-relaxed">
                            Hesabınızı oluşturun ve ayrıcalıklı alışverişin keyfini çıkarın. En yeni trendler ve size özel kampanyalar sizi bekliyor.
                        </p>
                    </div>

                    <div className="flex items-center gap-8 text-white/40 text-sm font-bold uppercase tracking-[0.2em]">
                        <span>© 2024 E-SHOP PREMIUM</span>
                        <span>PRIVACY POLICY</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="w-full max-w-md space-y-12 relative z-10">
                    <div className="space-y-4">
                        <Link href="/" className="lg:hidden inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-8">
                            <ArrowLeft className="w-4 h-4" /> Geri Dön
                        </Link>
                        <h1 className="text-5xl font-bold text-foreground tracking-tighter leading-none">Yeni Hesap.</h1>
                        <p className="text-muted-foreground font-medium text-lg italic">Birkaç adımda kaydınızı tamamlayın ve hemen alışverişe başlayın.</p>
                    </div>

                    <form action={formAction} className="space-y-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] ml-1">Adınız</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        className="w-full px-6 py-5 bg-white dark:bg-zinc-900 rounded-[2rem] border border-border-subtle focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-semibold placeholder:text-zinc-300 shadow-sm"
                                        placeholder="Can"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] ml-1">Soyadınız</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        className="w-full px-6 py-5 bg-white dark:bg-zinc-900 rounded-[2rem] border border-border-subtle focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-semibold placeholder:text-zinc-300 shadow-sm"
                                        placeholder="Yılmaz"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] ml-1">E-Posta Adresiniz</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300 group-focus-within:text-primary transition-colors" />
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
                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em] ml-1">Şifreniz</label>
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

                        {registerState?.error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold animate-pulse">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {registerState.error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <Button
                                type="submit"
                                isLoading={isPending}
                                className="w-full h-20 text-lg rounded-[2rem] gap-3 shadow-2xl shadow-primary/20"
                            >
                                Kayıt Ol <ChevronRight className="w-5 h-5" />
                            </Button>

                            <div className="text-center pt-2">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                    Zaten hesabınız var mı? <Link href="/login" className="text-primary hover:underline ml-2">Oturum Aç</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
