"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { register, ActionState } from "@/app/actions/auth";
import { Loader2, User, Lock, Mail, ChevronRight, AlertCircle } from "lucide-react";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

const initialState: ActionState = {
    error: undefined,
    success: false,
};

export function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    const [state, formAction, isPending] = useActionState(register, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            alert("Kayıt başarılı! Lütfen giriş yapınız.");
            onClose();
            onSwitchToLogin();
        }
    }, [state.success, onClose, onSwitchToLogin]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Hesap Oluştur">
            <div className="space-y-6">
                <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">Aramıza Katılın</h2>
                    <p className="text-zinc-500 text-xs mt-1">E-Shop fırsatlarından yararlanmak için kaydolun.</p>
                </div>

                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-widest ml-1">Ad</label>
                            <input
                                type="text"
                                name="firstName"
                                required
                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none transition-all text-sm font-bold text-zinc-900 dark:text-white"
                                placeholder="Ahmet"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-widest ml-1">Soyad</label>
                            <input
                                type="text"
                                name="lastName"
                                required
                                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none transition-all text-sm font-bold text-zinc-900 dark:text-white"
                                placeholder="Yılmaz"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-widest ml-1">E-posta</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none transition-all text-sm font-bold text-zinc-900 dark:text-white"
                                placeholder="ornek@mail.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-600 dark:text-zinc-500 uppercase tracking-widest ml-1">Şifre</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none transition-all text-sm font-bold text-zinc-900 dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {state?.error && (
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 p-3 rounded-xl flex items-center gap-2 text-red-600 text-[10px] font-bold">
                            <AlertCircle className="w-4 h-4" />
                            {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="group relative w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl disabled:opacity-50 overflow-hidden"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "KAYIT OL"}
                            {!isPending && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </div>
                    </button>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white text-[10px] font-black uppercase tracking-wider transition-colors"
                        >
                            Zaten hesabınız var mı? <span className="text-blue-600">Giriş Yap</span>
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
