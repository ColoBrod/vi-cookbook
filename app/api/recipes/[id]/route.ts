import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { RecipesAddDto } from "@/types/dto";
import { Unit } from "@/app/generated/prisma";

type Params = {
  params: { id: string }
};

export async function DELETE(request: Request, { params }: Params) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid recipe id" }, { status: 400 });
  }

  await prisma.recipe.delete({ where: { id } });
  return NextResponse.json({ status: 200 });
}

export async function PUT(request: Request, { params }: Params) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid recipe id" }, { status: 400 });
  }

  const data = await request.json() as RecipesAddDto;

  const recipe = await prisma.recipe.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      ingredients: {
        deleteMany: {}, // удалить все старые
        create: data.ingredients.map(ing => ({
          product: {
            connect: { id: ing.productId },
          },
          amount: ing.amount,
          unit: Unit.G,
        }))
      }
    },
    include: {
      ingredients: { include: { product: true } }
    }
  });

  return NextResponse.json(recipe, { status: 200 });
}
