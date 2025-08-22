import RecipeForm from "./components/RecipeForm";
import prisma from "@/lib/prisma";

export default async function() {
  const products = await prisma.product.findMany();

  return (
    <RecipeForm products={products} />
  );
}
