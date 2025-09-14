import { z } from 'zod';

export const productSchema = z.object({
  // Meta
  id: z.number().optional(),
  slug: z.string().min(2, "Название для ссылки обязательно"),
  name: z.string().min(2, 'Название продукта обязательно' ),

  // Nutrition Facts
  calories: z.number('Укажи калорийность').min(0, 'Калорийность не может быть отрицательной' ),
  protein: z.number('Укажи кол-во белков').min(0, 'Количество белков не может быть отрицательным'),
  fat: z.number('Укажи кол-во жиров').min(0, 'Количество жиров не может быть отрицательным' ),
  carbs: z.number('Укажи кол-во углеводов').min(0, 'Количество углеводов не может быть отрицательным'),
});

export const updateProductSchema = productSchema.partial();

export type ProductFormValues = z.infer<typeof productSchema>;
export type CreateProductDto = z.infer<typeof productSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
