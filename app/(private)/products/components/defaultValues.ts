import { ProductFormValues } from "@/lib/validation/products";
import { Unit } from "@/app/generated/prisma";

export const defaultValues: ProductFormValues = {
  slug: "",
  name: "",

  availableUnits: [Unit.G],

  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,

  fiber: 0,
  sugar: 0,

  omega3: 0,
  omega6: 0,

  mineralNa: 0,
  mineralK: 0,
  mineralCa: 0,
  mineralFe: 0,
  mineralMg: 0,
  mineralZn: 0,
  mineralP: 0,
  mineralSe: 0,

  vitaminA: 0,
  vitaminC: 0,
  vitaminD: 0,
  vitaminE: 0,
  vitaminK: 0,
  vitaminB1: 0,
  vitaminB2: 0,
  vitaminB3: 0,
  vitaminB6: 0,
  vitaminB9: 0,
  vitaminB12: 0,

  valine: 0,
  isoleucine: 0,
  leucine: 0,
  lysine: 0,
  methionine: 0,
  threonine: 0,
  tryptophan: 0,
  phenylalanine: 0,
  histidine: 0,

  glycemicIndex: 0,
}
