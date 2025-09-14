import { HttpStatus } from "@/lib/http-status";
import prisma, { isPrismaError } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { deleteImage, storeImageV2 } from "@/lib/images";
import { v4 as uuidv4 } from 'uuid';
import { mimeToExt } from "@/constants/images";

type Params = {
  params: Promise<{ id: string }>
};

export async function GET(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Invalid media id" }, 
    { status: HttpStatus.BadRequest }
  );

  const media = await prisma.media.findUnique({ where: { id} });

  if (media === null) return NextResponse.json(
    { error: 'Media not found' },
    { status: HttpStatus.NotFound }
  );

  return NextResponse.json(media, { status: HttpStatus.Ok });
}

export async function PUT(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Invalid media id" }, 
    { status: HttpStatus.BadRequest }
  );

  const media = await prisma.media.findUnique({ where: { id} });

  if (media === null) return NextResponse.json(
    { error: 'Media not found' },
    { status: HttpStatus.NotFound }
  );

  const formData = await request.formData();
  const file = formData.get('file');

  if (file instanceof File === false) return NextResponse.json(
    { error: "Expected file" }, 
    { status: HttpStatus.BadRequest }
  );

  // @ts-ignore
  if (mimeToExt.has(file.type) === false) return NextResponse.json(
    { error: "Bad Mime Type" }, 
    { status: HttpStatus.BadRequest }
  );
  
  if (file.size > 100 * 1024) return NextResponse.json(
    { error: 'Размер файла не должен превышать 100 KB' },
    { status: HttpStatus.PayloadTooLarge },
  );

  await deleteImage(media.path);

  const mediaCreateInput = await storeImageV2(file, 'recipes', media.uuid);

  await prisma.media.update({
    where: { id },
    data: mediaCreateInput,
  });

  return NextResponse.json(media, { status: HttpStatus.Ok });
}

export async function DELETE(request: Request, { params }: Params) {
  const id = parseInt((await params).id);

  if (isNaN(id)) return NextResponse.json(
    { error: "Invalid media id" }, 
    { status: HttpStatus.BadRequest }
  );

  const media = await prisma.media.findUnique({ 
    where: { id },
    include: { recipe: true },
  });

  if (media === null) return NextResponse.json(
    { error: 'Media not found' },
    { status: HttpStatus.NotFound }
  );

  const { recipe } = media;

  if (recipe) await prisma.recipe.update({ 
    where: { id: recipe.id },
    data: { imageId: null },
  });
  await prisma.media.delete({ where: { id } });

  await deleteImage(media.path);

  return NextResponse.json(media, { status: HttpStatus.Ok });
}

// class CustomError extends Error {
// }

// func1() {
//   func2() {
//     func3() {
//
//     }
//   }
// }
