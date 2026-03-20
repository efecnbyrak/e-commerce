import { LucideIcon, PackageOpen } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    actionLabel?: string;
    actionHref?: string;
}

export function EmptyState({
    title,
    description,
    icon: Icon = PackageOpen,
    actionLabel,
    actionHref
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mb-6 text-zinc-400">
                <Icon className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase italic mb-2">
                {title}
            </h3>
            <p className="text-sm text-zinc-500 font-medium max-w-sm mb-8 leading-relaxed">
                {description}
            </p>
            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs tracking-widest transition-all shadow-lg shadow-blue-600/20 uppercase"
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}
