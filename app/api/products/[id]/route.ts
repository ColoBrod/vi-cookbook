import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { HttpStatus } from "@/lib/http-status";
import { isPrismaError } from "@/lib/prisma";

import { updateProductSchema, UpdateProductDto, CreateProductDto, productSchema } from "@/lib/validation/products";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Некорректный ID продукта" }, 
    { status: HttpStatus.BadRequest }
  );

  try {
    const deleted = await prisma.product.delete({ where: { id } });
    return NextResponse.json(deleted, { status: HttpStatus.Ok });
  }
  catch (e) {
    if (isPrismaError(e) && e.code === 'P2025') return NextResponse.json(
      { error: 'Продукт не найден' },
      { status: HttpStatus.NotFound },
    );
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" }, 
      { status: HttpStatus.InternalServerError }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Некорректный ID продукта" }, 
    { status: HttpStatus.BadRequest }
  );

  let parsed: CreateProductDto;

  try { parsed = await request.json() }
  catch {
    return NextResponse.json(
      { error: 'Отсутствуют данные для обновления продукта' },
      { status: HttpStatus.BadRequest }
    );
  }

  const validation = productSchema.safeParse(parsed);
  if (validation.success === false) return NextResponse.json(
    { error: validation.error }, 
    { status: HttpStatus.BadRequest }
  );

  const { data } = validation;

  const updated = await prisma.product.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated, { status: HttpStatus.Ok });
}

export async function PATCH(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Некорректный ID продукта" }, 
    { status: HttpStatus.BadRequest }
  );

  let parsed: UpdateProductDto;

  try { parsed = await request.json() }
  catch {
    return NextResponse.json(
      { error: 'Отсутствуют данные для обновления продукта' },
      { status: HttpStatus.BadRequest }
    );
  }

  const validation = updateProductSchema.safeParse(parsed);
  if (validation.success === false) return NextResponse.json(
    { error: validation.error }, 
    { status: HttpStatus.BadRequest }
  );

  const { data } = validation;

  const updated = await prisma.product.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated, { status: HttpStatus.Ok });
}
