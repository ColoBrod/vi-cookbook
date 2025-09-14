import RecipeForm from "../../components/RecipeForm";
import { getRecipeBySlugOrUuid } from '@/model/recipe';
import { notFound } from 'next/navigation';
import { RecipeFormValues } from "@/lib/validation/recipes";
import { getAvailableIngredients } from "@/model/recipe";
import { getRecipesTags } from "@/model/tags";

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function({ params }: PageProps) {
  const slug = (await params).slug;
  const [availableIngredients, availableTags, recipeCombined] = await Promise.all([
    getAvailableIngredients(),
    getRecipesTags(),
    getRecipeBySlugOrUuid(slug),
  ]);

  if (recipeCombined === null) notFound();

  const { recipe } = recipeCombined;

  const formValues = mapRecipeToFormValues(recipe);

  return (
    <RecipeForm 
      recipe={formValues} 
      imagePath={recipe.imagePath}
      items={availableIngredients} 
      tags={availableTags} 
    />
  );

  function mapRecipeToFormValues(
    recipe: NonNullable<Awaited<ReturnType<typeof getRecipeBySlugOrUuid>>>['recipe']
  ): RecipeFormValues {
    return ({
      id: recipe.id,
      slug: recipe.slug,
      name: recipe.name,
      description: recipe.description,
      instructions: recipe.instructions,
      image: null,
      items: recipe.items.map(item => ({
        type: item.ingredientType,
        ingredientUuid: item.ingredientUuid,
        amount: item.amount,
      })),
      tags: recipe.tags.map(tag => tag.id),
    });
  }
}
