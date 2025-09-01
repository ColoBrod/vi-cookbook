import { CollectionRecipe, IngredientType } from "@/app/generated/prisma";

export interface CollectionsCreateDto {
  name: string;
}

export interface CollectionUpdateDto {
  recipeId: number;
  weight: number;
}

export type CollectionRecipePatchDto = Omit<CollectionRecipe, 'id' | 'collectionId'>;

export interface CollectionAddRecipeDto {
  recipeId: number;
  // collectionId: number;
  weight: number;
}

export interface RecipesAddDto {
  slug: string;
  name: string;
  items: {
    type: IngredientType;
    ingredientUuid: string;
    amount: number;
  }[];
  tags: number[];
}
