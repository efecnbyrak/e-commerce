"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { login, ActionState } from "@/app/actions/auth";
import { Loader2, User, Lock, ChevronRight, X, AlertCircle } from "lucide-react";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

const initialState: ActionState = {
    error: undefined,
    success: false,
};

export function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
    const [loginState, formAction, isLoginPending] = useActionState(login, initialState);
    
    const router = useRouter();

    useEffect(() => {
        if (loginState.success) {
            router.refresh();
            onClose();
        }
    }, [loginState.success, router, onClose]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
            }}
            title="Giriş Yap"
        >
            <div className="space-y-6">
                <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Hoş Geldiniz</h2>
                    <p className="text-zinc-500 text-xs mt-1">Devam etmek için lütfen giriş bilgilerinizi girin.</p>
                </div>

                <form action={formAction} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-widest ml-1">
                            E-posta
                        </label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border-2 border-zinc-200 dark:border-transparent focus:border-blue-600 outline-none transition-all text-sm font-bold placeholder:text-zinc-400 text-zinc-900 dark:text-white"
                                placeholder="ornek@mail.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-widest ml-1">
                            Şifre
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border-2 border-zinc-200 dark:border-transparent focus:border-blue-600 outline-none transition-all text-sm font-bold placeholder:text-zinc-400 text-zinc-900 dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                className="w-4 h-4 rounded border-2 border-zinc-200 dark:border-zinc-700 text-blue-600 focus:ring-blue-600 transition-all cursor-pointer"
                            />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                                Beni Hatırla
                            </span>
                        </label>
                    </div>

                    {loginState?.error && (
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 p-3 rounded-xl flex items-center gap-2 text-red-600 text-[10px] font-bold animate-in shake-in duration-300">
                            <AlertCircle className="w-4 h-4" />
                            {loginState.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoginPending}
                        className="group relative w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50 overflow-hidden"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {isLoginPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "GİRİŞ YAP"}
                            {!isLoginPending && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </div>
                    </button>

                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onSwitchToRegister}
                            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[10px] font-black uppercase tracking-wider transition-colors"
                        >
                            Hesabınız yok mu? <span className="text-blue-600">Hemen Kayıt Ol</span>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
