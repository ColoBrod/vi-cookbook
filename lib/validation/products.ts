import { z } from 'zod';

export const productSchema = z.object({
  // Meta
  id: z.number().optional(),
  slug: z.string().min(2, "Название для ссылки обязательно"),
  name: z.string().min(2, 'Название продукта обязательно' ),

  // Nutrition Facts

  // КБЖУ
  calories: z.number('Укажи калорийность').min(0, 'Калорийность не может быть отрицательной' ),
  protein: z.number('Укажи кол-во белков').min(0, 'Количество белков не может быть отрицательным'),
  fat: z.number('Укажи кол-во жиров').min(0, 'Количество жиров не может быть отрицательным' ),
  carbs: z.number('Укажи кол-во углеводов').min(0, 'Количество углеводов не может быть отрицательным'),

  fiber: z.number().min(0),
  sugar: z.number().min(0),

  omega3: z.number().min(0),
  omega6: z.number().min(0),

  mineralNa: z.number().min(0),
  mineralK: z.number().min(0),
  mineralCa: z.number().min(0),
  mineralFe: z.number().min(0),
  mineralMg: z.number().min(0),
  mineralZn: z.number().min(0),
  mineralP: z.number().min(0),
  mineralSe: z.number().min(0),

  vitaminA: z.number().min(0),
  vitaminC: z.number().min(0),
  vitaminD: z.number().min(0),
  vitaminE: z.number().min(0),
  vitaminK: z.number().min(0),
  vitaminB1: z.number().min(0),
  vitaminB2: z.number().min(0),
  vitaminB3: z.number().min(0),
  vitaminB6: z.number().min(0),
  vitaminB9: z.number().min(0),
  vitaminB12: z.number().min(0),

  valine: z.number().min(0),
  isoleucine: z.number().min(0),
  leucine: z.number().min(0),
  lysine: z.number().min(0),
  methionine: z.number().min(0),
  threonine: z.number().min(0),
  tryptophan: z.number().min(0),
  phenylalanine: z.number().min(0),
  histidine: z.number().min(0),

  glycemicIndex: z.number().min(0),
});

export const updateProductSchema = productSchema.partial();

export type ProductFormValues = z.infer<typeof productSchema>;
export type CreateProductDto = z.infer<typeof productSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
