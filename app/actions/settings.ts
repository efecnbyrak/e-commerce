"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/session";

export async function getSystemSettings() {
    const settings = await (db as any).systemSetting.findMany();
    return settings.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr.value;
        return acc;
    }, {} as Record<string, string>);
}

export async function updateSystemSetting(key: string, value: string) {
    const session = await verifySession();
    if (session.role !== "ADMIN") throw new Error("Unauthorized");

    await (db as any).systemSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
    });

    if (key === "MAINTENANCE_MODE") {
        const cookieStore = await cookies();
        if (value === "true") {
            cookieStore.set("MAINTENANCE_MODE", "true", { path: "/" });
        } else {
            cookieStore.delete("MAINTENANCE_MODE");
        }
    }

    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true };
}

export async function getContactMessages() {
    const session = await verifySession();
    if (session.role !== "ADMIN") throw new Error("Unauthorized");

    return await (db as any).contactMessage.findMany({
        orderBy: { createdAt: "desc" }
    });
}

export async function markMessageAsRead(id: number) {
    const session = await verifySession();
    if (session.role !== "ADMIN") throw new Error("Unauthorized");

    await (db as any).contactMessage.update({
        where: { id },
        data: { isRead: true }
    });

    revalidatePath("/admin/inbox");
    return { success: true };
}

export async function deleteMessage(id: number) {
    const session = await verifySession();
    if (session.role !== "ADMIN") throw new Error("Unauthorized");

    await (db as any).contactMessage.delete({
        where: { id }
    });

    revalidatePath("/admin/inbox");
    return { success: true };
}
