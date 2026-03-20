"use server";

import { db } from "@/lib/db";
import { CategorySchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { ActionState } from "./auth";

export async function createCategory(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = CategorySchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: "Lütfen kategori bilgilerini kontrol ediniz.", success: false };
    }

    const data = validatedFields.data;

    try {
        const slug = data.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
        
        await db.category.create({
            data: {
                ...data,
                slug,
            }
        });

        revalidatePath("/admin/categories");
        return { success: true, message: "Kategori başarıyla oluşturuldu." };
    } catch (error) {
        console.error("Create Category error:", error);
        return { error: "Kategori oluşturulurken bir hata oluştu.", success: false };
    }
}

export async function updateCategory(id: number, prevState: ActionState, formData: FormData): Promise<ActionState> {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = CategorySchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: "Lütfen kategori bilgilerini kontrol ediniz.", success: false };
    }

    const data = validatedFields.data;

    try {
        await db.category.update({
            where: { id },
            data
        });

        revalidatePath("/admin/categories");
        return { success: true, message: "Kategori başarıyla güncellendi." };
    } catch (error) {
        console.error("Update Category error:", error);
        return { error: "Kategori güncellenirken bir hata oluştu.", success: false };
    }
}

export async function deleteCategory(id: number): Promise<ActionState> {
    try {
        // Check for products in this category
        const productsCount = await db.product.count({ where: { categoryId: id } });
        if (productsCount > 0) {
            return { error: "Bu kategoride ürünler bulunduğu için silinemez.", success: false };
        }

        await db.category.delete({ where: { id } });
        revalidatePath("/admin/categories");
        return { success: true, message: "Kategori başarıyla silindi." };
    } catch (error) {
        console.error("Delete Category error:", error);
        return { error: "Kategori silinirken bir hata oluştu.", success: false };
    }
}
