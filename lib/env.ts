import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32).default("placeholder_for_build_purposes_only_32_chars"),
  JWT_REFRESH_SECRET: z.string().min(32).default("placeholder_for_build_purposes_only_32_chars"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  IYZICO_API_KEY: z.string().optional(),
  IYZICO_SECRET_KEY: z.string().optional(),
  IYZICO_BASE_URL: z.string().optional(),
  PAYMENT_ENABLED: z.string().optional().default("false").transform((v) => v === "true"),
});

const envResult = envSchema.safeParse(process.env);

if (!envResult.success) {
  console.error("❌ Invalid environment variables:", envResult.error.format());
  throw new Error("Invalid environment variables");
}

export const env = envResult.data;
