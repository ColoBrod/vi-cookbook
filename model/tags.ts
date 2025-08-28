import prisma from "@/lib/prisma";

export function getRecipesTags() {
  return prisma.tag.findMany({
    where: {
      isRecipe: true,
    },
  });
}
