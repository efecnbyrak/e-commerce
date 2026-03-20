"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export interface UserActionState {
    error?: string;
    success: boolean;
    message?: string;
    id?: any;
}

export async function createUser(prevState: UserActionState, formData: FormData): Promise<UserActionState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const role = formData.get("role") as string || "USER";
    const isActive = formData.get("isActive") === "on";

    if (!email || !password || !firstName) {
        return { error: "Lütfen gerekli tüm alanları doldurunuz.", success: false };
    }

    try {
        const existingUser = await (db.user as any).findUnique({ where: { email } });
        if (existingUser) {
            return { error: "Bu e-posta adresi zaten kullanımda.", success: false };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await (db.user as any).create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role,
                isActive
            }
        });

        revalidatePath("/admin/users");
        return { success: true, message: "Kullanıcı başarıyla oluşturuldu.", id: newUser.id };
    } catch (error) {
        console.error("Create user error:", error);
        return { error: "Kullanıcı oluşturulurken bir hata oluştu.", success: false };
    }
}
