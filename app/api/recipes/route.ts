import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { RecipesAddDto } from "@/types/dto";
import { Unit } from "@/app/generated/prisma";
import { sendTelegramMessage } from "@/lib/tg/sendTelegramMessage";

export async function POST(request: Request) {
  const data = await request.json() as RecipesAddDto;
  console.log(data);
  // prisma.recipe.
  // prisma.recipe.groupBy
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

  sendTelegramMessage(`Пользователь создал новый рецепт. Просмотреть: http://192.168.1.2:3000/recipes/${recipe.id}`);
  return NextResponse.json(recipe, { status: 200 });
}

