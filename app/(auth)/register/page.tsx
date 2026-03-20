"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register, ActionState } from "@/app/actions/auth";
import { Loader2, Lock, User, ChevronRight, AlertCircle, ShoppingBag, Mail } from "lucide-react";
import Link from "next/link";

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
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-transform italic">E</div>
                        <span className="text-3xl font-black tracking-tighter uppercase italic text-zinc-900 dark:text-white">E-Shop</span>
                    </Link>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic leading-none">Hesap Oluştur</h1>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-3">Hemen aramıza katılın</p>
                </div>

                <form action={formAction} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] ml-2">AD</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full px-6 py-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all text-sm font-bold placeholder:text-zinc-400 shadow-sm"
                                placeholder="Can"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] ml-2">SOYAD</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full px-6 py-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border-2 border-transparent focus:border-blue-600 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all text-sm font-bold placeholder:text-zinc-400 shadow-sm"
                                placeholder="Yılmaz"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] ml-2">E-POSTA</label>
                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
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
                        <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] ml-2">ŞİFRE</label>
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

                    {registerState?.error && (
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 p-4 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in shake-in duration-300">
                            <AlertCircle className="w-5 h-5" />
                            {registerState.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="group relative w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 overflow-hidden"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "KAYIT OL"}
                            {!isPending && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                        </div>
                    </button>

                    <div className="text-center pt-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Zaten hesabınız var mı? <Link href="/login" className="text-blue-600 hover:underline">Oturum Aç</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
