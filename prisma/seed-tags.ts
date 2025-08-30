import prisma from "@/lib/prisma";

export enum RecipeTag {
  Soup = 'Суп',
  Breakfast = 'Завтрак',
  Sauce = 'Соус',
  Survive = 'Выживание',
  FastFood = 'Фастфуд',
  Sandwich = 'Сэндвич',
  Rolls = 'Ролл',
}

export async function createTags() {
  await prisma.tag.createMany({
    data: [
      { name: RecipeTag.Soup },
      { name: RecipeTag.Breakfast },
      { name: RecipeTag.Sauce },
      { name: RecipeTag.Survive },
      { name: RecipeTag.FastFood },
      { name: RecipeTag.Sandwich },
      { name: RecipeTag.Rolls },
    ],
  })
  
}
