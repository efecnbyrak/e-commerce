export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-zinc-950">
            {children}
        </div>
    )
}
