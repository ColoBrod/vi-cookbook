import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { productSchema, CreateProductDto } from "@/lib/validation/products";
import { HttpStatus } from "@/lib/http-status";
import { Product } from "@/app/generated/prisma";
import { isPrismaError } from "@/lib/prisma";
import { PrismaErrorCode } from "@/types/prisma";

export async function POST(request: Request) {

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

  let product: Product;

  try {
    product = await prisma.product.create({ data });
    return NextResponse.json(product, { status: HttpStatus.Ok });
  }
  catch (e) {
    if (isPrismaError(e) && e.code === PrismaErrorCode.UniqueConstraintFailed)
      return NextResponse.json(
        { error: "Подборка с таким именем уже существует" },
        { status: HttpStatus.Conflict }
      );
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера'}, 
      { status: HttpStatus.InternalServerError }
    );
  }

}
