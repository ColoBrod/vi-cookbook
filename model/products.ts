import prisma from "@/lib/prisma";
import { Product } from "@/app/generated/prisma";

export async function getProductBySlugOrUuid(slugOrUuid: string): Promise<Product | null> {
  const product = await prisma.product.findFirst({
    where: {
      OR: [
        { slug: slugOrUuid },
        { uuid: slugOrUuid },
      ],
    },
  });
  return product;
}

// export async function getProductId(): number {}

export async function getProductById(id: number): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { id } });
  return product;
}


//
// export async function create(data: Product): Product {
//   const product = await prisma.product.create({ data });
// }
