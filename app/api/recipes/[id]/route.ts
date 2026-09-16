import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Unit } from "@/app/generated/prisma";
import { HttpStatus } from "@/lib/http-status";
import { recipeSchema, UpdateRecipeDto } from "@/lib/validation/recipes";
import { storeImage } from "@/lib/images";
import { recipesService } from "@/lib/services/recipesService";

type Params = {
  params: Promise<{ id: string }>
};

export async function DELETE(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Некорректный идентификатор рецепта" }, 
    { status: HttpStatus.BadRequest }
  );
  await recipesService.delete(id);
  return NextResponse.json({ status: 200 });
}

export async function PUT(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Некорректный идентификатор рецепта" }, 
    { status: HttpStatus.BadRequest }
  );

  let parsed: UpdateRecipeDto;
  try { parsed = await request.json() }
  catch {
    return NextResponse.json(
      { error: 'Отсутствуют данные для обновления рецепта' },
      { status: HttpStatus.BadRequest }
    );
  }

  const validation = recipeSchema.safeParse(parsed);

  if (validation.success === false) return NextResponse.json(
    { error: validation.error }, 
    { status: HttpStatus.BadRequest }
  );

  const { data } = validation;

  const updated = await recipesService.update(id, data);
  const recipe = await recipesService.getById(updated.id);

  return NextResponse.json(
    recipe, 
    { status: HttpStatus.Ok }
  );
}
