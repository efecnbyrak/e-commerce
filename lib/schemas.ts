import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Geçerli bir e-posta adresi giriniz."),
    password: z.string().min(1, "Şifre gereklidir."),
    rememberMe: z.boolean().optional(),
});

export const RegisterSchema = z.object({
    firstName: z.string()
        .min(2, "Ad en az 2 karakter olmalıdır.")
        .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Ad sadece harflerden oluşmalıdır."),
    lastName: z.string()
        .min(2, "Soyad en az 2 karakter olmalıdır.")
        .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Soyad sadece harflerden oluşmalıdır."),
    email: z.string().email("Geçerli bir e-posta adresi giriniz."),
    password: z.string()
        .min(8, "Şifre en az 8 karakter olmalıdır.")
        .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir.")
        .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir.")
        .regex(/[0-9]/, "Şifre en az bir rakam içermelidir."),
    passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordConfirm"],
});

export const ProductSchema = z.object({
    name: z.string().min(3, "Ürün adı en az 3 karakter olmalıdır."),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır."),
    price: z.coerce.number().positive("Fiyat pozitif bir sayı olmalıdır."),
    salePrice: z.coerce.number().positive().optional(),
    stock: z.coerce.number().int().nonnegative("Stok negatif olamaz."),
    categoryId: z.coerce.number().int().positive("Geçerli bir kategori seçiniz."),
    images: z.array(z.string().url()).min(1, "En az bir resim gereklidir."),
    isFeatured: z.boolean().default(false),
    isActive: z.boolean().default(true),
});

export const CategorySchema = z.object({
    name: z.string().min(2, "Kategori adı en az 2 karakter olmalıdır."),
    description: z.string().optional(),
    parentId: z.coerce.number().int().positive().optional().nullable(),
});
