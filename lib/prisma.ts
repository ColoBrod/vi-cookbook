import { PrismaClient } from '@/app/generated/prisma'

const globalForPrisma = global as unknown as { 
  prisma: PrismaClient
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;

// export function isPrismaError(e: unknown): boolean {
//   const proto = Object.getPrototypeOf(e);
//   const className = proto.constructor.name;
//   if (className === 'PrismaClientKnownRequestError') return true;
//   return false;
// }

export function isPrismaError(e: unknown): e is { code: string } {
  return (
    typeof e === "object" &&
    e !== null &&
    "code" in e &&
    typeof (e as any).code === "string"
  );
}
