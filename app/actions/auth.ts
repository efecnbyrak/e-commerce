"use server";

import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { LoginSchema, RegisterSchema } from "@/lib/schemas";

export interface ActionState {
    error?: string;
    success: boolean;
    message?: string;
    id?: number | string;
}

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = LoginSchema.safeParse({
        ...rawData,
        rememberMe: formData.get("rememberMe") === "on"
    });

    if (!validatedFields.success) {
        return { error: "Geçersiz giriş bilgileri.", success: false };
    }

    const { email, password, rememberMe } = validatedFields.data;

    try {
        const user = await db.user.findUnique({
            where: { email }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { error: "E-posta veya şifre hatalı.", success: false };
        }

        if (!user.isActive) {
            return { error: "Hesabınız pasif durumdadır.", success: false };
        }

        const userRole = (user as any).role;
        await createSession(user.id, userRole, !!rememberMe);

        await db.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() }
        });

        if (userRole === "ADMIN") {
            redirect("/admin");
        } else {
            redirect("/");
        }
    } catch (error: any) {
        if (error.digest?.startsWith('NEXT_REDIRECT')) throw error;
        console.error("Login error:", error);
        return { error: "Giriş yapılırken bir hata oluştu.", success: false };
    }
}

export async function register(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = RegisterSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: "Lütfen tüm alanları doğru doldurunuz.", success: false };
    }

    const { email, password, firstName, lastName } = validatedFields.data;

    try {
        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: "Bu e-posta adresi zaten kullanımda.", success: false };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: "USER"
            }
        });

        return { success: true, message: "Kayıt başarıyla tamamlandı. Giriş yapabilirsiniz.", id: newUser.id };
    } catch (error) {
        console.error("Register error:", error);
        return { error: "Kayıt olurken bir hata oluştu.", success: false };
    }
}

export async function logout() {
    await deleteSession();
    redirect("/login");
}

export async function seedAdmin() {
    const adminEmail = "admin@example.com";
    const existingAdmin = await db.user.findUnique({ where: { email: adminEmail } });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await db.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN",
                firstName: "System",
                lastName: "Admin",
                isActive: true
            }
        });
        console.log("Admin seeded: admin@example.com / admin123");
    }
}
