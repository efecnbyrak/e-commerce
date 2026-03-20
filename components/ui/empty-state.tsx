import { LucideIcon, PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

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
        <div className="flex flex-col items-center justify-center p-16 text-center bg-white dark:bg-zinc-900/50 rounded-card border border-border-subtle shadow-card">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2 tracking-tight">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-8 leading-relaxed">
                {description}
            </p>
            {actionLabel && actionHref && (
                <Link href={actionHref}>
                    <Button variant="primary" size="md">
                        {actionLabel}
                    </Button>
                </Link>
            )}
        </div>
    );
}
