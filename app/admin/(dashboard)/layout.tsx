import { getSession } from "@/lib/session";
import { AdminLayoutClient } from "./AdminLayoutClient";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    // Secure the admin area
    if (!session || session.role !== "ADMIN") {
        redirect("/login");
    }

    let user = null;
    try {
        user = await db.user.findUnique({
            where: { id: session.userId },
            select: { firstName: true, lastName: true, imageUrl: true }
        });
    } catch (error) {
        console.error("Admin Layout User Fetch Error:", error);
    }

    const fullName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Yönetici" : "Yönetici";

    return (
        <AdminLayoutClient role={session.role} imageUrl={user?.imageUrl} fullName={fullName}>
            {children}
        </AdminLayoutClient>
    );
}
