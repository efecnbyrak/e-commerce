import { getSession } from "@/lib/session";
import { CheckoutClient } from "./CheckoutClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Lock, ArrowRight } from "lucide-react";

export default async function CheckoutPage() {
    const session = await getSession();

    if (!session) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-10 max-w-xl mx-auto">
                <div className="w-24 h-24 rounded-[2rem] bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shadow-xl shadow-indigo-500/10">
                    <User className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-foreground tracking-tight">Oturum Açmanız Gerekiyor</h1>
                    <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                        Güvenliğiniz ve sipariş takibi yapabilmeniz için sadece kayıtlı kullanıcılarımız ödeme yapabilmektedir.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    <Link href="/login?callbackUrl=/checkout" className="w-full">
                        <Button variant="primary" size="lg" className="w-full h-16 rounded-2xl gap-3 shadow-xl shadow-primary/20">
                            Giriş Yap <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                        <Button variant="outline" size="lg" className="w-full h-16 rounded-2xl border-border-subtle bg-surface hover:bg-muted/50">
                            Kayıt Ol
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-widest pt-4">
                    <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Güvenli Bağlantı
                </div>
            </div>
        );
    }

    return <CheckoutClient />;
}
