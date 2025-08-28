import RecipeForm from "../components/RecipeForm";
import { getAvailableIngredients } from "@/model/recipe";
import { getRecipesTags } from "@/model/tags";

export default async function() {
  const availableIngredients = await getAvailableIngredients();
  const availableTags = await getRecipesTags();

  return (
    <RecipeForm items={availableIngredients} tags={availableTags} />
  );
}
