"use client";

import { useActionState, useEffect } from "react";
import { createUser, UserActionState } from "@/app/actions/users";
import { User, Mail, Lock, Shield, Check, AlertCircle, ChevronDown, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function UserForm() {
    const router = useRouter();
    const initialState: UserActionState = { success: false };
    const [state, formAction, isPending] = useActionState(createUser, initialState);

    useEffect(() => {
        if (state?.success) {
            toast.success("Kullanıcı başarıyla oluşturuldu!");
            router.push("/admin/users");
        }
    }, [state, router]);

    return (
        <form action={formAction} className="space-y-12">
            {state?.error && (
                <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center gap-4 text-red-500 text-sm font-bold animate-in fade-in slide-in-from-top-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {state.error}
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Ad</label>
                    <Input 
                        name="firstName"
                        placeholder="Örn: Ahmet"
                        icon={<User className="w-5 h-5 text-zinc-700" />}
                        required 
                        className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary shadow-xl text-white placeholder:text-zinc-800"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Soyad</label>
                    <Input 
                        name="lastName"
                        placeholder="Örn: Yılmaz"
                        icon={<UserCircle2 className="w-5 h-5 text-zinc-700" />}
                        className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary shadow-xl text-white placeholder:text-zinc-800"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">E-Posta Adresi</label>
                    <Input 
                        type="email"
                        name="email"
                        placeholder="ahmet@example.com"
                        icon={<Mail className="w-5 h-5 text-zinc-700" />}
                        required
                        className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary shadow-xl text-white placeholder:text-zinc-800"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Şifre</label>
                    <Input 
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        icon={<Lock className="w-5 h-5 text-zinc-700" />}
                        required
                        className="h-16 rounded-[1.25rem] bg-zinc-950/50 border-white/5 focus:ring-primary shadow-xl text-white placeholder:text-zinc-800"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Rol</label>
                    <div className="relative group">
                        <Shield className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 group-focus-within:text-primary transition-colors pointer-events-none" />
                        <select 
                            name="role"
                            className="w-full pl-16 pr-12 h-16 bg-zinc-950/50 border border-white/5 rounded-[1.25rem] text-[15px] font-medium text-white focus:ring-2 focus:ring-primary transition-all outline-none appearance-none shadow-xl cursor-pointer"
                        >
                            <option value="USER" className="bg-zinc-950">Müşteri / Üye</option>
                            <option value="ADMIN" className="bg-zinc-950">Yönetici (Admin)</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 pointer-events-none group-hover:text-primary transition-colors" />
                    </div>
                </div>

                <div className="flex items-center gap-6 md:gap-12 p-6 md:p-8 bg-white/5 border border-white/5 rounded-[1.5rem] shadow-inner mt-auto h-auto min-h-[4rem]">
                    <label className="flex items-center gap-4 cursor-pointer group w-full">
                        <div className="relative flex items-center">
                            <input 
                                type="checkbox" 
                                name="isActive" 
                                defaultChecked={true}
                                className="peer w-7 h-7 rounded-xl border-2 border-white/10 bg-zinc-950 text-primary focus:ring-primary transition-all checked:bg-primary checked:border-primary" 
                            />
                            <Check className="absolute left-1.5 top-1.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className="text-sm font-bold text-zinc-500 group-hover:text-white transition-colors">Hesabı Aktif Et</span>
                    </label>
                </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-end gap-8">
                <Button 
                    isLoading={isPending}
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-20 h-16 rounded-[1.25rem] text-[15px] font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all"
                >
                    Kullanıcıyı Kaydet
                </Button>
            </div>
        </form>
    );
}
