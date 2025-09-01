import prisma from "@/lib/prisma";
import { IngredientType, Product, Recipe } from "@/app/generated/prisma";
import { FormRecipeItem, RecipeTableRow } from "@/types/recipes";
import { Uuid, Weight } from "@/types/general";

export async function getAvailableIngredients(): Promise<FormRecipeItem[]> {
  const [products, recipes] = await Promise.all([
    prisma.product.findMany({
      select: { uuid: true, name: true }
    }),
    prisma.recipe.findMany({
      select: { uuid: true, name: true }
    }),
  ]);
  return [
    ...products.map(p => ({ ...p, type: IngredientType.PRODUCT })),
    ...recipes.map(r => ({ ...r, type: IngredientType.RECIPE }))
  ];
}

export async function getRecipeBySlugOrUuid(slugOrUuid: string) {
  const recipe = await prisma.recipe.findFirst({
    select: { id: true },
    where: {
      OR: [
        { slug: slugOrUuid },
        { uuid: slugOrUuid },
      ],
    },
  });
  if (recipe === null) return null;
  return getRecipeById(recipe.id);
}

export async function getRecipeId(uuidOrSlug: string): Promise<number | null> {
  const recipe = await prisma.recipe.findFirst({
    select: { id: true },
    where: {
      OR: [
        { uuid: uuidOrSlug },
        { slug: uuidOrSlug },
      ],
    },
  });
  return recipe?.id ?? null;
}

export async function getRecipeById(id: number) {
  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: { items: true, tags: true },
  });
  if (recipe === null) return null;

  const promises = recipe.items.map(item => {
    if (item.ingredientType === IngredientType.RECIPE) {
      return prisma.recipe.findUnique({ 
        where: {
          uuid: item.ingredientUuid
        }
      });
    }
    else if (item.ingredientType === IngredientType.PRODUCT) {
      return prisma.product.findUnique({
        where: {
          uuid: item.ingredientUuid
        },
      });
    }
  })
  const ingredients = await Promise.all(promises);
  const table: RecipeTableRow[] = [];

  for (let i = 0; i < recipe.items.length; i++) {
    const item = recipe.items[i]!;

    if (item.ingredientType === IngredientType.PRODUCT) {
      const product = ingredients[i]! as Product;
      table.push({
        uuid: item.ingredientUuid,
        type: item.ingredientType,
        amount: item.amount,
        unit: item.unit,
        name: product.name,
        calories: product.calories,
        protein: product!.protein,
        fat: product.fat,
        carbs: product.carbs,
      });
    }
    else if (item.ingredientType === IngredientType.RECIPE) {
      const recipe = ingredients[i]! as Recipe;
      table.push({
        uuid: item.ingredientUuid,
        type: item.ingredientType,
        amount: item.amount,
        unit: item.unit,
        name: recipe.name,
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      });
    }
  }

  // const totals = 

  // const ingredients = recipe.items.map((item, i): RecipeTableRow => {
  //   const ingredient = full[i]!;
  //   if (ingredient instanceof Product) {
  //
  //   }
  //   //   if (item.ingredientType === IngredientType.PRODUCT) return ({
  //   //     uuid: ingredient.uuid,
  //   //     type: item.ingredientType,
  //   //     name: ingredient.name,
  //   //     calories: full!.calories,
  //   //     protein: full!.protein,
  //   //     fat: full!.fat,
  //   //     carbs: full!.carbs,
  //   //   })
  // });
  return { recipe, table };
}

export async function getRecipeProductsWeight(recipeId: number) {
  const uuidToWeight = await getRecipeProductsUuidWeightMap(recipeId);
  const products = await prisma.product.findMany({
    where: {
      uuid: { in: Array.from(uuidToWeight.keys()) }, 
    },
  });

  return products.map(product => ({
    uuid: product.uuid,
    name: product.name,
    weight: uuidToWeight.get(product.uuid) ?? 0,
  }));
}

export async function getRecipeProductsUuidWeightMap(recipeId: number) {

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      items: true,
    },
  });

  const uuidToWeight = new Map<Uuid, Weight>();

  if (recipe === null) return uuidToWeight;

  for (const item of recipe.items) {
    if (item.ingredientType === IngredientType.PRODUCT) {
      accumulateWeight(item.ingredientUuid, item.amount);
    }
    else if (item.ingredientType === IngredientType.RECIPE) {
      const subRecipeId = await getRecipeId(item.ingredientUuid) as number;
      // if (subRecipeId === null)
      //   throw new Error (`Рецепт с UUID ${item.ingredientUuid} не найден`);
      const subRecipeMap = await getRecipeProductsUuidWeightMap(subRecipeId);
      const subRecipeYield = [...subRecipeMap].reduce((acc, cur) => acc + cur[1], 0);
      const factor = item.amount / subRecipeYield;
      [...subRecipeMap.entries()]
        .forEach(([uuid, weight]) => accumulateWeight(uuid, weight * factor));
      // subRecipeMap.forEach((value, key) => accu)
    }
  }

  return uuidToWeight;

  function accumulateWeight(uuid: Uuid, weight: Weight): void {
    const accumulated = uuidToWeight.get(uuid);
    if (accumulated === undefined) {
      uuidToWeight.set(uuid, weight);
    }
    else {
      uuidToWeight.set(uuid, weight + accumulated);
    }
  }
}

// function mapIngredientsToTable(input: (Recipe|Product)[]): RecipeTableRow[] {
//
//
// }
