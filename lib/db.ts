import { PrismaClient } from "@prisma/client";

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "production" ? [] : ["query"],
  });
};

const globalForPrisma = global as unknown as { prisma: ReturnType<typeof createPrismaClient> };

export const db = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
