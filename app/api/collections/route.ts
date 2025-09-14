import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CollectionsCreateDto } from "@/types/dto";
import prisma, { isPrismaError } from "@/lib/prisma";
import { PrismaErrorCode } from "@/types/prisma";
import { HttpStatus } from "@/lib/http-status";

export async function GET() {
  // const session = await getServerSession(authOptions);
  // if (session === null) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const collections = await prisma.collection.findMany({
    where: { author: { email: session?.user?.email! } }
  });

  return NextResponse.json(collections, { status: 200 });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session === null) return NextResponse.json(
    { error: "Не авторизован" }, 
    { status: HttpStatus.Unauthorized }
  );

  const data = await request.json() as CollectionsCreateDto;

  try {
    const collection = await prisma.collection.create({
      data: {
        name: data.name,
        author: {
          connect: { email: session?.user?.email! },
        },
      },
    });
    return NextResponse.json(collection, { status: HttpStatus.Created });
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
