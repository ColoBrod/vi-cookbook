import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CollectionsCreateDto } from "@/types/dto";
import prisma from "@/lib/prisma";
// import { PrismaClientKnownRequestError } from "@/app/generated/prisma/runtime/library";
// import Prisma from "@prisma/client";
// import { Prisma } from "@/app/generated/prisma";
// import { PrismaClientKnownRequestError } from "@/app/generated/prisma/runtime/library";
// import { PrismaClientKnownRequestError } from "@/app/generated/prisma/runtime/library";
// import { Prisma } from '@prisma/client';
import { Prisma } from "@/app/generated/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session === null) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const collections = await prisma.collection.findMany({
    where: { author: { email: session?.user?.email! } }
  });

  return NextResponse.json(collections, { status: 200 });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session === null) return NextResponse.json(
    { error: "Не авторизован" }, 
    { status: 401 }
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
    return NextResponse.json(collection, { status: 200 });
  }
  catch (e) {
    console.log("MY FUCKING ERROR")
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Подборка с таким именем уже существует!!" },
        { status: 409 }
      );
      // if (e.code === "P2002") return NextResponse.json(
      //   { error: "Подборка с таким именем уже существует!!" },
      //   { status: 409 }
      // );
    }
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера'}, 
      { status: 500 }
    );
  }
}
