import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Unit } from "@/app/generated/prisma";
import { HttpStatus } from "@/lib/http-status";
import { recipeSchema, UpdateRecipeDto } from "@/lib/validation/recipes";
import { storeImage } from "@/lib/images";

type Params = {
  params: Promise<{ id: string }>
};

export async function DELETE(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid recipe id" }, { status: 400 });
  }

  await prisma.recipe.delete({ where: { id } });
  return NextResponse.json({ status: 200 });
}

export async function PUT(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Некорректный идентификатор рецепта" }, 
    { status: HttpStatus.BadRequest }
  );

  const formData = await request.formData();
  const image = formData.get('image');
  const json = formData.get('data') as string;

  let parsed: UpdateRecipeDto;

  try { parsed = JSON.parse(json) }
  catch {
    return NextResponse.json(
      { error: 'Отсутствуют данные для обновления рецепта' },
      { status: HttpStatus.BadRequest }
    );
  }

  const validation = recipeSchema.safeParse({ ...parsed, image });

  if (validation.success === false) return NextResponse.json(
    { error: validation.error }, 
    { status: HttpStatus.BadRequest }
  );

  const { data } = validation;

  let imagePath: string | undefined;
  if (image instanceof File) imagePath = await storeImage(image, data);

  const updated = await prisma.recipe.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      description: data.description,
      instructions: data.instructions,
      ...(imagePath && { imagePath }),
      items: {
        deleteMany: {}, // удалить все старые
        create: data.items.map(item => ({
          ingredientUuid: item.ingredientUuid,
          ingredientType: item.type,
          amount: item.amount,
          unit: Unit.G,
        }))
      },
      tags: {
        set: data.tags.map(tagId => ({ id: tagId })),
      },
    },
    include: {
      items: true,
      tags: true,
    }
  });

  const recipe = await prisma.recipe.findUnique({ where: { id: updated.id } });

  return NextResponse.json(recipe, { status: HttpStatus.Ok });
}
