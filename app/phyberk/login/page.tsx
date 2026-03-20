"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Package, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
    const [state, action, isPending] = useActionState(login, { success: false });

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10 space-y-12">
                {/* Logo & Header */}
                <div className="text-center space-y-4">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform duration-500">
                            <Package className="w-8 h-8 text-white" />
                        </div>
                    </Link>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-white tracking-tight">Yönetici Girişi</h1>
                        <p className="text-zinc-500 font-medium">Sisteme erişmek için kimlik bilgilerinizi doğrulayın.</p>
                    </div>
                </div>

                <Card className="bg-zinc-900/50 backdrop-blur-3xl border-white/5 p-10 rounded-[2.5rem] shadow-2xl">
                    <form action={action} className="space-y-8">
                        {state?.error && (
                            <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl text-danger text-sm font-bold text-center animate-shake">
                                {state.error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Kullanıcı Adı</label>
                                <Input 
                                    name="email" 
                                    placeholder="phyberk" 
                                    required 
                                    className="h-14 bg-white/5 border-white/5 text-white placeholder:text-zinc-700 rounded-2xl focus:ring-primary focus:border-primary transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Şifre</label>
                                <Input 
                                    name="password" 
                                    type="password" 
                                    placeholder="••••••••" 
                                    required 
                                    className="h-14 bg-white/5 border-white/5 text-white placeholder:text-zinc-700 rounded-2xl focus:ring-primary focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <Button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full h-16 rounded-2xl text-lg font-bold gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {isPending ? "Giriş Yapılıyor..." : (
                                <>Giriş Yap <ArrowRight className="w-5 h-5" /></>
                            )}
                        </Button>
                    </form>
                </Card>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 text-zinc-600">
                        <div className="h-px w-12 bg-zinc-800" />
                        <ShieldCheck className="w-5 h-5 opacity-40" />
                        <div className="h-px w-12 bg-zinc-800" />
                    </div>
                    <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.2em]">Güvenli Yönetim Paneli v2.0</p>
                </div>
            </div>
        </div>
    );
}
