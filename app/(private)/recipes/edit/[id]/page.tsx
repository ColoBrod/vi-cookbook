import RecipeForm from "../../components/RecipeForm";
import prisma from "@/lib/prisma";
import { getRecipeById } from '@/model/recipe';
import { notFound } from 'next/navigation';
import { FormValues } from "../../components/RecipeForm";
import { RecipeJoined } from "@/types/recipes";

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function({ params }: PageProps) {
  const id = parseInt((await params).id);
  // const products = await prisma.product.findMany();
  const [products, recipe] = await Promise.all([
    prisma.product.findMany(),
    getRecipeById(id),
  ]);

  if (recipe === null) notFound();

  const formValues = mapRecipeToFormValues(recipe);

  return (
    <RecipeForm recipe={formValues} products={products} />
  );

  function mapRecipeToFormValues(recipe: RecipeJoined): FormValues {
    return ({
      id: recipe.id,
      slug: recipe.slug,
      name: recipe.name,
      ingredients: recipe.ingredients.map(ing => ({
        productId: ing.productId ?? 0,
        amount: ing.amount,
      }))
    });

  }
}
