import prisma from "@/lib/prisma";
import { Product } from "@/app/generated/prisma";

// : Promise<Product | null>

export async function getProductBySlugOrUuid(slugOrUuid: string) {
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { slug: slugOrUuid },
        { uuid: slugOrUuid },
      ],
    },
    include: { availableUnits: true },
  });
  if (product === null) return null;
  return {
    ...product,
    availableUnits: product.availableUnits.map(u => u.unit),
  }
}

// : Promise<Product | null>

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({ 
    where: { id },
    include: { availableUnits: true },
  });
  if (product === null) return null;
  return {
    ...product,
    availableUnits: product.availableUnits.map(u => u.unit),
  }
}
