'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body className="bg-[#09090b] text-zinc-400 font-sans">
        <div className="min-h-screen flex items-center justify-center p-6 text-center">
          <div className="max-w-xl w-full space-y-12">
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-danger/20 blur-3xl rounded-full" />
                <div className="relative w-24 h-24 rounded-[2.5rem] bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto shadow-2xl shadow-danger/10">
                    <AlertCircle className="w-12 h-12 text-danger" />
                </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic">Kritik Sistem Hatası</h2>
              <p className="text-zinc-500 font-medium leading-relaxed">
                Uygulama başlatılırken kritik bir hata oluştu. Bu genellikle eksik yapılandırma veya veritabanı bağlantı sorunlarından kaynaklanır.
              </p>
              {error.digest && (
                <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest pt-4">
                  Hata Kodu: {error.digest}
                </p>
              )}
            </div>

            <Button
              onClick={() => reset()}
              size="lg"
              className="h-20 px-12 rounded-3xl bg-primary text-white font-black uppercase tracking-widest gap-4 shadow-3xl shadow-primary/30 hover:scale-105 transition-transform"
            >
              <RefreshCcw className="w-6 h-6" /> Uygulamayı Yeniden Başlat
            </Button>

            <div className="pt-12 border-t border-white/5">
                <p className="text-[10px] font-bold text-zinc-800 uppercase tracking-[0.4em]">
                    Vercel Environment Variables: DATABASE_URL & JWT_ACCESS_SECRET
                </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
