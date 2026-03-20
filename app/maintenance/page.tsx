import Link from "next/link";
import { Hammer, HardHat, Construction, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Polish */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[160px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[160px] animate-pulse delay-700" />
            </div>

            <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
                {/* Visual Icon */}
                <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-zinc-900 border border-white/5 flex items-center justify-center shadow-2xl relative z-10">
                        <Construction className="w-16 h-16 text-primary animate-bounce shadow-primary/20" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-zinc-950 shadow-xl animate-pulse">
                        <HardHat className="w-6 h-6" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                        Daha İyi <br /> <span className="text-primary italic">Hizmet</span> İçin Ara Verdik
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto">
                        Sizlere daha modern ve hızlı bir alışveriş deneyimi sunmak için sitemizi kısa süreliğine bakıma aldık. Çok yakında geri döneceğiz!
                    </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="p-8 rounded-[2rem] bg-zinc-900/50 backdrop-blur-3xl border border-white/5 space-y-4 hover:border-primary/20 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white uppercase tracking-widest text-xs">Tahmini Süre</h3>
                            <p className="text-zinc-500 font-medium">Yaklaşık 2 saat içinde aktif olacağız.</p>
                        </div>
                    </div>
                    <div className="p-8 rounded-[2rem] bg-zinc-900/50 backdrop-blur-3xl border border-white/5 space-y-4 hover:border-indigo-500/20 transition-all group">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white uppercase tracking-widest text-xs">Bizimle İletişim</h3>
                            <p className="text-zinc-500 font-medium">destek@e-shop.com üzerinden ulaşabilirsiniz.</p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col items-center gap-6">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em]">Gelişmiş E-Ticaret Deneyimi v4.2</p>
                    <div className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping delay-150" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-ping delay-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}
