import prisma from "@/lib/prisma";

export async function getRecipeById(id: number) {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: {
        include: {
          product: true, 
        },
      },
    },
  });
  return recipe;
}
