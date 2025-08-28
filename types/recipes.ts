import { getRecipeById } from '@/model/recipe';
import { IngredientType, Unit } from '@/app/generated/prisma';

export type RecipeJoined = NonNullable<Awaited<ReturnType<typeof getRecipeById>>>;

export interface FormRecipeItem {
  uuid: string;
  type: IngredientType;
  name: string;
}

export interface FormRecipeTag {
  id: number;
  name: string;
}

export interface NutritionFacts {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface RecipeTableRow extends FormRecipeItem, NutritionFacts {
  amount: number;
  unit: Unit;
}

export type RecipeTable = RecipeTableRow[];

