import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CollectionsCreateDto } from "@/types/dto";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session === null) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json() as CollectionsCreateDto;

  const collection = await prisma.collection.create({
    data: {
      name: data.name,
      author: {
        connect: { email: session?.user?.email! },
      },
    },
  });

  if (collection) return NextResponse.json(collection, { status: 200 });
  return NextResponse.json({ error: 'Something went wrong'}, { status: 500 });
}
