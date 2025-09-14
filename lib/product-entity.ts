import { Product } from "@/app/generated/prisma";
import { Minerals, Vitamins } from "@/types/general";

export default class ProductEntity {
  public calories: number;
  public protein: number;
  public fat: number;
  public carbs: number;
  public fiber: number;
  public sugar: number;

  public mineral: Minerals;
  public vitamin: Vitamins;

  public glycemicIndex: number;

  constructor(data: Product) {
    this.calories = data.calories;
    this.protein = data.protein;
    this.fat = data.fat;
    this.carbs = data.carbs;
    this.fiber = data.fiber;
    this.sugar = data.sugar;

    this.mineral = {
      Na: data.mineralNa,
      K:  data.mineralK,
      Ca: data.mineralCa,
      Fe: data.mineralFe,
      Mg: data.mineralMg,
      Zn: data.mineralZn,
      P:  data.mineralP,
      Se: data.mineralSe,
    };

    this.vitamin = {
      A  : data.vitaminA,
      C  : data.vitaminC,
      D  : data.vitaminD,
      E  : data.vitaminE,
      K  : data.vitaminK,
      B1 : data.vitaminB1,
      B2 : data.vitaminB2,
      B3 : data.vitaminB3,
      B6 : data.vitaminB6,
      B9 : data.vitaminB9,
      B12: data.vitaminB12,
    };

    this.glycemicIndex = data.glycemicIndex;
  }
}
