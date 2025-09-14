import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { HttpStatus } from "@/lib/http-status";
import { storeImageV2 } from "@/lib/images";
import { ImageMimeType } from "@/types/images";
import { v4 as uuidv4 } from 'uuid';
import { mimeToExt } from "@/constants/images";

/**
 * Сохраняет изображение в uploads
 * Создает запись в базе данных о загруженном изображении
 */
export async function POST(request: Request) {
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

  try {
    const uuid = uuidv4();
    const mediaCreateInput = await storeImageV2(file, 'recipes', uuid);
    const media = await prisma.media.create({ data: mediaCreateInput });

    return NextResponse.json(media, { status: HttpStatus.Created });
  }
  catch (e) {
    return NextResponse.json(
      { error: 'Something went wrong' }, 
      { status: HttpStatus.Ok }
    );
  }
}
