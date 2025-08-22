import prisma from '@/lib/prisma';
import { type Category } from '@/app/generated/prisma';

interface CategoryTree extends Category {
  children: CategoryTree[];
}

export async function getCategories() {
  const categories = await prisma.category.findMany();
  return categories;
}

export async function getCategoryTree(
  parentId: number | null = null
): Promise<CategoryTree[]> {
  const categories = await prisma.category.findMany({
    where: { parentId: parentId },
  })

  return Promise.all(categories.map(async (cat) => ({
    ...cat,
    children: await getCategoryTree(cat.id)
  })))
}
