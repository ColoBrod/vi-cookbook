import prisma from "@/lib/prisma";
import { Unit } from "@/app/generated/prisma";
import { UpdateProductDto, CreateProductDto, PatchProductDto } from "@/lib/validation/products";
import { connect } from "http2";

class ProductsService {
  public getAll() {
    return prisma.product.findMany();
  }

  public getById(id: number) {
    return prisma.product.findUnique({ where: { id } });
  }

  public create(data: CreateProductDto, userId: number) {
    const { name, slug, availableUnits, calories, fat, carbs, protein } = data;

    return prisma.product.create({
      data: {
        slug,
        name,
        availableUnits: {
          create: availableUnits.map((unit) => ({
            unit,
          })),
        },
        calories,
        fat,
        carbs,
        protein,
      },
    });
  }

  public update(id: number, data: UpdateProductDto) {
    const { name, slug, availableUnits, calories, fat, carbs, protein } = data;

    return prisma.product.update({
      where: { id },
      data: {
        slug,
        name,
        availableUnits: {
          deleteMany: {},
          create: availableUnits.map((unit) => ({
            unit,
          })),
        },
        calories,
        fat,
        carbs,
        protein,
      },
      include: {
        availableUnits: true,
      },
    });
  }

  // public patch(id: number, data: PatchProductDto) {
  //   return prisma.product.update({
  //     where: { id },
  //     data: { ...data },
  //   })
  // }

  public delete(id: number) {
    return prisma.product.delete({ where: { id } });
  }
}

export const productsService = new ProductsService();
