import { AppLink } from "@/types/links";

export const pages = new Map<AppLink, string>([
  [AppLink.Products, "Продукты"],
  [AppLink.Recipes, "Рецепты"],
  [AppLink.Collections, "Подборки"],
  // [AppLink.Categories, "Категории"],
]);
