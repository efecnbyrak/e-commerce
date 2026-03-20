"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, ActionState } from "@/app/actions/auth";
import { Loader2, Lock, User, ChevronRight, AlertCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";

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
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform italic">E</div>
                        <span className="text-3xl font-black tracking-tighter uppercase italic text-zinc-900 dark:text-white">E-Shop</span>
                    </Link>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic leading-none">Hoş Geldiniz</h1>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-3">Hesabınıza giriş yapın</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] ml-2">E-POSTA ADRESİ</label>
                        <div className="relative group">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full pl-16 pr-6 py-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all text-sm font-bold placeholder:text-zinc-400 shadow-sm"
                                placeholder="ornek@mail.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em]">ŞİFRE</label>
                            <Link href="#" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Şifremi Unuttum</Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full pl-16 pr-6 py-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all text-sm font-bold placeholder:text-zinc-400 shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-2">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                            className="w-5 h-5 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 text-blue-600 focus:ring-blue-600 transition-all cursor-pointer"
                        />
                        <label htmlFor="rememberMe" className="text-[10px] font-black text-zinc-500 uppercase tracking-widest cursor-pointer hover:text-zinc-800 transition-colors">Beni Hatırla</label>
                    </div>

                    {loginState?.error && (
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in shake-in duration-300">
                            <AlertCircle className="w-5 h-5" />
                            {loginState.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoginPending}
                        className="group relative w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 overflow-hidden"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            {isLoginPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "OTURUM AÇ"}
                            {!isLoginPending && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </div>
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div></div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em]"><span className="bg-white dark:bg-zinc-900 px-4 text-zinc-400">VEYA</span></div>
                    </div>

                    <Link
                        href="/register"
                        className="w-full flex items-center justify-center gap-3 py-5 rounded-[2rem] border-2 border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                    >
                        YENİ HESAP OLUŞTUR
                    </Link>
                </form>
            </div>
        </div>
    );
}
