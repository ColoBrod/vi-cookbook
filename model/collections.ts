import prisma from "@/lib/prisma";
import { getRecipeProductsUuidWeightMap } from "./recipe";
import { Uuid, Weight } from "@/types/general";

export async function getCollectionProductsWeight(id: number) {

  const collectionRecipes = await prisma.collectionRecipe.findMany({
    where: { collectionId: id }
  });

  const uuidToWeight = new Map<Uuid, Weight>();

  const recipes = await Promise.all(
    collectionRecipes.map(async (cr) => ({
      id: cr.recipeId,
      map: await getRecipeProductsUuidWeightMap(cr.recipeId),
      weight: cr.weight,
    }))
  );

  for (const { map, weight } of recipes) {
    const total = [...map.values()].reduce((acc, cur) => acc + cur, 0);
    const factor = weight / total;
    // const weight = collectionRecipes.find(cr => cr)
    [...map.entries()]
      .forEach(([uuid, weight]) => {
        accumulateWeight(uuid, weight*factor)
      });
  }

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

export async function getCollection(id: number) {
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: { 
      author: true, 
      recipes: { 
        include: { 
          recipe: { 
            include: { items: true } 
          } 
        } 
      } 
    },
  });
  return collection;
}

export async function getCollections(userEmail: string) {
  const collections = await prisma.collection.findMany({
    where: {
      author: { email: userEmail }
    },
    include: { 
      author: true, 
      recipes: { include: { recipe: true } },
    },
  });
  return collections;
}

export async function collectionHasRecipe(collectionId: number, recipeId: number): Promise<boolean> {
  const collectionRecipe = await prisma.collectionRecipe.findFirst({
    where: { collectionId, recipeId }
  });
  return collectionRecipe ? true : false;
}

