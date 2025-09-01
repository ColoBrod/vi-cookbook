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

  console.log('Server error:');
  console.log(recipe)

  return NextResponse.json(recipe, { status: 200 });
}
