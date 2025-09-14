interface NutritionFactsInput {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

class NutritionFacts {
  public calories: number;
  public protein: number;
  public fat: number;
  public carbs: number;

  constructor(input: NutritionFactsInput) {
    this.calories = input.calories;
    this.protein = input.calories;
    this.fat = input.calories;
    this.carbs = input.calories;
  }
}

const ingerdients: NutritionFactsInput[] = [];

ingerdients.forEach(ing => new NutritionFacts(ing));
