export interface RecipesAddDto {
  slug: string;
  name: string;
  ingredients: {
    productId: number;
    amount: number;
  }[];
}
