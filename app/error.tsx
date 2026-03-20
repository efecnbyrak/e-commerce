'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  const isDatabaseError = error.message.includes('Prisma') || 
                         error.message.includes('database') || 
                         error.message.includes('connection');

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 text-zinc-400">
      <div className="max-w-xl w-full space-y-12 text-center">
        <div className="relative inline-block">
            <div className="absolute inset-0 bg-danger/20 blur-3xl rounded-full" />
            <div className="relative w-24 h-24 rounded-[2.5rem] bg-danger/10 border border-danger/20 flex items-center justify-center mx-auto transition-transform hover:scale-110 duration-500">
                <AlertCircle className="w-12 h-12 text-danger" />
            </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-5xl font-bold text-white tracking-tighter">Bir Sorun Oluştu</h2>
          <p className="text-zinc-500 font-medium leading-relaxed">
            {isDatabaseError 
              ? "Veritabanı bağlantısı kurulamadı. Lütfen internet bağlantınızı kontrol edin veya servis sağlayıcınızın durumunu doğrulayın." 
              : "İstediğiniz işlem gerçekleştirilirken beklenmedik bir hata ile karşılaşıldı."}
          </p>
          {error.digest && (
            <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest pt-2">
              Hata Kimliği: {error.digest}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Button
            onClick={() => reset()}
            size="lg"
            className="h-16 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold gap-3"
          >
            <RefreshCcw className="w-5 h-5" /> Tekrar Dene
          </Button>
          <Link href="/">
            <Button
              size="lg"
              className="w-full h-16 rounded-2xl bg-primary text-white font-bold gap-3 shadow-xl shadow-primary/20"
            >
              <Home className="w-5 h-5" /> Ana Sayfa
            </Button>
          </Link>
        </div>

        <div className="pt-12 border-t border-white/5">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
                Sistem Yönetici Bildirimi: Veritabanı yapılandırmasını kontrol edin.
            </p>
        </div>
      </div>
    </div>
  );
}
