import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CollectionRecipePatchDto, CollectionUpdateDto } from "@/types/dto";

type Params = {
  params: { id: string }
};

export async function DELETE(request: Request, { params }: Params) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid recipe id" }, { status: 400 });
  }

  await prisma.collection.delete({ where: { id } });
  return NextResponse.json({ status: 200 });
}

export async function POST(request: Request, { params }: Params) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid recipe id" }, { status: 400 });
  }

  const data = await request.json() as CollectionUpdateDto;

  await prisma.collection.update({
    where: { id },
    data: {
      recipes: {
        create: {
          recipeId: data.recipeId,
          weight: data.weight,
        },
      }
    },
    include: {
      recipes: true,
    },
  })
}

export async function PATCH(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid recipe id" }, { status: 400 });
  }

  const { recipeId, weight } = await request.json() as CollectionRecipePatchDto;

  const collectionRecipe = await prisma.collectionRecipe.update({ 
    where: { 
      collectionId_recipeId: {
        collectionId: id,
        recipeId,
      },
    }, 
    data: {
      weight
    },
  });

  return NextResponse.json(collectionRecipe, { status: 200 });
}


