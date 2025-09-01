import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CollectionAddRecipeDto } from "@/types/dto";
import { collectionHasRecipe } from "@/model/collections";

type Params = {
  params: { id: string }
};

export async function POST(request: Request, { params }: Params) {
  const id = parseInt(params.id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Invalid collection id" }, 
    { status: 400 }
  );

  const data = await request.json() as CollectionAddRecipeDto;

  const crExists = await collectionHasRecipe(id, data.recipeId);

  if (crExists) return NextResponse.json(
    { error: 'Комбинации такой подборки и рецепта уже существует' }, 
    { status: 409 }
  );

  const collectionRecipe = await prisma.collectionRecipe.create({
    data: {
      collection: { connect: { id } },
      recipe: { connect: { id: data.recipeId } },
      weight: data.weight,
    },
  });

  return NextResponse.json(collectionRecipe, { status: 200 });
}
