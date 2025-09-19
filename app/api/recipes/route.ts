import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { Unit } from "@/app/generated/prisma";
import { sendTelegramMessage } from "@/lib/tg/sendTelegramMessage";
import { HttpStatus } from "@/lib/http-status";
import { getUserId } from "@/lib/user";
import { CreateRecipeDto, recipeSchema } from "@/lib/validation/recipes";

export async function GET(request: Request) {
  const recipes = await prisma.recipe.findMany();
  return NextResponse.json(recipes, { status: HttpStatus.Ok });
}

export async function POST(request: Request) {

  const userId = getUserId(request);

  let parsed: CreateRecipeDto;
  try { parsed = await request.json() }
  catch {
    return NextResponse.json(
      { error: 'Отсутствуют данные для обновления продукта' },
      { status: HttpStatus.BadRequest }
    );
  }

  const validation = recipeSchema.safeParse(parsed);
  if (validation.error) console.log(validation.error);
  if (validation.success === false) return NextResponse.json(
    { error: validation.error }, 
    { status: HttpStatus.BadRequest }
  );

  const { data } = validation;

  // const imagePath = image instanceof File ? await storeImage(image, data) : "";

  const created = await prisma.recipe.create({
    data: {
      slug: data.slug,
      name: data.name,
      description: data.description,
      instructions: data.instructions,
      // imageId: data.imageId,
      // image: {
      //   connect: { id: data.imageId },
      // },
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
        connect: { id: userId }
      }
    },
    include: {
      author: true,
      items: true,
      tags: true,
    },
  });

  const recipe = await prisma.recipe.findUnique({
    where: { id: created.id }
  });

  // await sendTelegramMessage(`Пользователь создал новый рецепт. Просмотреть: http://192.168.1.2:3000/recipes/${created.slug}`, imagePath);

  return NextResponse.json(
    recipe, 
    { status: HttpStatus.Created }
  );
}

