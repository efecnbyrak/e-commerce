import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="relative">
                    <h1 className="text-[12rem] font-black text-zinc-100 dark:text-zinc-900 leading-none select-none">404</h1>
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                        <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic">Sayfa Bulunamadı</p>
                        <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Aradığınız ürün veya sayfa mevcut değil.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <Link 
                        href="/"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 uppercase flex items-center justify-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Ana Sayfaya Dön
                    </Link>
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full py-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-2xl font-black text-xs tracking-widest transition-all active:scale-95 uppercase flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Geri Git
                    </button>
                </div>
            </div>
        </div>
    );
}
