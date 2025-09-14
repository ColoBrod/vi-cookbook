import { z } from 'zod';
import { IngredientType } from '@/app/generated/prisma';

export const recipeSchema = z.object({
  id: z.number().optional(),
  slug: z.string().min(2, "Slug обязателен"),
  name: z.string().min(2, "Название рецепта обязательно"),
  description: z.string().min(1).or(z.null()),
  instructions: z.string().min(1).or(z.null()),
  image: z.instanceof(File).or(z.null()),
  tags: z.array(z.number()),
  items: z.array(z.object({
    type: z.enum(IngredientType), // можно уточнить enum из IngredientType
    ingredientUuid: z.string().min(1, "Выбери ингредиент"),
    amount: z.number().min(0, "Amount не может быть отрицательным"),
  })),
});

// const num: number = "str";

// export const updateRecipeSchema = recipeSchema.extend({
//   image: 
// })

// const patchRecipeScheme = recipeSchema.partial();

// export const createRecipeDtoSchema = recipeSchema.omit({
//   image: true
// });

export type RecipeFormValues = z.infer<typeof recipeSchema>;
export type CreateRecipeDto = z.infer<typeof recipeSchema>;
export type UpdateRecipeDto = z.infer<typeof recipeSchema>;
