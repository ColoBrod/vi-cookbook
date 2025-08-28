import RecipeForm from "../../components/RecipeForm";
import prisma from "@/lib/prisma";
import { getRecipeBySlugOrUuid } from '@/model/recipe';
import { notFound } from 'next/navigation';
import { FormValues } from "../../components/RecipeForm";
import { RecipeJoined } from "@/types/recipes";
import { getAvailableIngredients } from "@/model/recipe";
import { getRecipesTags } from "@/model/tags";

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function({ params }: PageProps) {
  const slug = (await params).slug;
  // const products = await prisma.product.findMany();
  const [availableIngredients, availableTags, recipeCombined] = await Promise.all([
    // prisma.product.findMany(),
    getAvailableIngredients(),
    getRecipesTags(),
    getRecipeBySlugOrUuid(slug),
  ]);

  if (recipeCombined === null) notFound();

  const { recipe } = recipeCombined;

  const formValues = mapRecipeToFormValues(recipe);

  return (
    <RecipeForm recipe={formValues} items={availableIngredients} tags={availableTags} />
  );

  function mapRecipeToFormValues(
    recipe: NonNullable<Awaited<ReturnType<typeof getRecipeBySlugOrUuid>>>['recipe']
  ): FormValues {
    return ({
      id: recipe.id,
      slug: recipe.slug,
      name: recipe.name,
      items: recipe.items.map(item => ({
        type: item.ingredientType,
        ingredientUuid: item.ingredientUuid,
        amount: item.amount,
      })),
      tags: recipe.tags.map(tag => tag.id),
    });
  }
}
