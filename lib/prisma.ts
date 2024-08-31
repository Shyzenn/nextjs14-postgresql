import { PrismaClient } from "@prisma/client";

// Extend the global namespace to include a PrismaClient instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Export a single PrismaClient instance, reusing the global one if it exists
export const prisma = globalThis.prisma || new PrismaClient();

// In production, set the global PrismaClient instance to avoid multiple instances
if (process.env.NODE_ENV! == "production") globalThis.prisma = prisma;
