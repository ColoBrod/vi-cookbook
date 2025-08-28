import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { RecipesAddDto } from "@/types/dto";
import { Unit } from "@/app/generated/prisma";
import { sendTelegramMessage } from "@/lib/tg/sendTelegramMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session === null) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json() as RecipesAddDto;


  const recipe = await prisma.recipe.create({
    data: {
      slug: data.slug,
      name: data.name,
      items: {
        create: data.items.map(item => ({
          ingredientUuid: item.ingredientUuid,
          ingredientType: item.type,
          amount: item.amount,
          unit: Unit.G,
        }))
      },
      tags: {
        connect: data.tags.map(tagId => ({ id: tagId })),
      },
      author: {
        connect: { email: session?.user?.email! }
      }
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });
  return NextResponse.json(recipe, { status: 200 });
  /*
  const recipe = await prisma.recipe.create({
    data: {
      slug: data.slug,
      name: data.name,
      items: {
        create: data.items.map(ing => ({
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
  */
}

