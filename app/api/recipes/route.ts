import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { RecipesAddDto } from "@/types/dto";
import { Unit } from "@/app/generated/prisma";

export async function POST(request: Request) {
  const data = await request.json() as RecipesAddDto;
  console.log(data);
  const recipe = await prisma.recipe.create({
    data: {
      slug: data.slug,
      name: data.name,
      ingredients: {
        create: data.ingredients.map(ing => ({
          product: {
            connect: { id: ing.productId },
          },
          amount: ing.amount,
          unit: Unit.G,
        }))
      },
    },
    include: {
      ingredients: {
        include: { product: true },
      },
    },
  });
  return NextResponse.json(recipe, { status: 200 });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const idParam = url.searchParams.get("id") ?? "0";
  const id = parseInt(idParam);
  console.log("DELETE");
  console.log(idParam);
  console.log(id);
  await prisma.recipe.delete({ where: { id } });
  return NextResponse.json({ status: 200 });
}
