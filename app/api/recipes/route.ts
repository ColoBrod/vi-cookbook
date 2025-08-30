import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { RecipesAddDto } from "@/types/dto";
import { Unit } from "@/app/generated/prisma";
import { sendTelegramMessage } from "@/lib/tg/sendTelegramMessage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { storeImage } from "@/lib/images";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session === null) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // const data = await request.json() as RecipesAddDto;
  const formData = await request.formData();
  const image = formData.get('image') as File;
  const json = formData.get('data') as string;
  const data = JSON.parse(json) as RecipesAddDto;
  const imagePath = await storeImage(image, data);

  const recipe = await prisma.recipe.create({
    data: {
      slug: data.slug,
      name: data.name,
      imagePath,
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

  await sendTelegramMessage(`Пользователь создал новый рецепт. Просмотреть: http://192.168.1.2:3000/recipes/${recipe.slug}`);
  return NextResponse.json(recipe, { status: 200 });
}

