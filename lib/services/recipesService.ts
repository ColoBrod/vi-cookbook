import prisma from "@/lib/prisma";
import { Unit } from "@/app/generated/prisma";
import { CreateRecipeDto, UpdateRecipeDto } from "@/lib/validation/recipes";

class RecipesService {
  public getAll() {
    return prisma.recipe.findMany();
  }

  public getById(id: number) {
    return prisma.recipe.findUnique({ where: { id } });
  }

  public create(data: CreateRecipeDto, userId: number) {
    const { 
      slug, name, description, instructions, imageId, items, tags 
    } = data;

    return prisma.recipe.create({
      data: {
        slug,
        name,
        description,
        instructions,
        ...(imageId && { image: { 
          connect: { id: imageId } 
        }}),
        // imageId,
        items: {
          create: items.map(item => ({
            ingredientUuid: item.ingredientUuid,
            ingredientType: item.type,
            amount: item.amount,
            unit: item.unit,
          }))
        },
        tags: { 
          connect: tags.map(tagId => ({ id: tagId })) 
        },
        author: { 
          connect: { id: userId } 
        },
      },
      include: { author: true, items: true, tags: true },
    });
  }

  public update(id: number, data: UpdateRecipeDto) {
    const { slug, name, description, instructions, imageId, items, tags } = data;
    return prisma.recipe.update({
      where: { id },
      data: {
        slug,
        name,
        description,
        instructions,
        imageId,
        items: {
          deleteMany: {},
          create: items.map(item => ({
            ingredientUuid: item.ingredientUuid,
            ingredientType: item.type,
            amount: item.amount,
            unit: item.unit,
          }))
        },
        tags: { 
          set: tags.map(tagId => ({ id: tagId })) 
        },
      },
      include: { items: true, tags: true },
    });
  }

  public delete(id: number) {
    return prisma.recipe.delete({ where: { id } });
  }
}

export const recipesService = new RecipesService();
