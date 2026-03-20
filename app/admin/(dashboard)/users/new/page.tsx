import { UserForm } from "../components/UserForm";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NewUserPage() {
    return (
        <div className="space-y-16 pb-32">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                         <Link href="/admin/users" className="hover:text-white transition-colors">Topluluk</Link>
                         <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                         <span className="text-white">Yeni Kullanıcı</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-2xl shadow-primary/20 border border-primary/20">
                            <UserPlus className="w-8 h-8" />
                        </div>
                        <h1 className="text-6xl font-bold text-white tracking-tighter">Yeni Kullanıcı Oluştur</h1>
                    </div>
                    <p className="text-zinc-500 font-medium text-lg max-w-xl">Sisteme yeni bir yönetici veya üye ekleyerek yetkilendirme yapın.</p>
                </div>
                <Link href="/admin/users">
                    <Button variant="outline" className="h-16 px-8 rounded-2xl border-white/5 bg-white/5 text-zinc-400 font-bold gap-3 hover:bg-white/10 hover:text-white transition-all">
                        <ChevronLeft className="w-5 h-5" /> İptal Et & Dön
                    </Button>
                </Link>
            </div>

            <Card className="p-10 md:p-16 border-white/5 bg-zinc-900/40 backdrop-blur-xl rounded-[3rem] shadow-3xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                <UserForm />
            </Card>
        </div>
    );
}
