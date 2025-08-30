import { IngredientType } from "@/app/generated/prisma";

export interface CollectionsCreateDto {
  name: string;
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
