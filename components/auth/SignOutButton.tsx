"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

export function SignOutButton() {
    return (
        <button 
            onClick={async () => {
                await logout();
            }}
            className="w-full py-6 bg-red-50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/20 text-red-600 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3"
        >
            <LogOut className="w-5 h-5" />
            Oturumu Kapat
        </button>
    );
}
