import path from "node:path";
import fs from 'node:fs/promises';

import { RecipesAddDto } from "@/types/dto";
import { Uuid } from "@/types/general";
import { type Prisma } from "@/app/generated/prisma";
import { ImageMimeType, ImageExtension } from "@/types/images";
import { mimeToExt } from "@/constants/images";

/*
 * @return Путь до файла или пустую строку, если не получилось сохранить файл
 */
export async function storeImage(image: File, data: RecipesAddDto): Promise<string> {
  try {
    const imageArrayBuffer = await image.arrayBuffer();
    const imageBuffer = Buffer.from(imageArrayBuffer);
    const imageMimeType = image.type as ImageMimeType
    const imageExt = mimeToExt.get(imageMimeType) as ImageExtension;
    const imagePath = path.join('recipes', `${data.slug}.${imageExt}`);
    const imageFullPath = path.join(process.cwd(), 'public', imagePath);
    await fs.writeFile(imageFullPath, imageBuffer);
    return `/${imagePath}`;
  }
  catch (e) {
    return "";
  }
}

export async function storeImageV2(
  file: File, table: 'recipes', uuid: Uuid
): Promise<Prisma.MediaCreateInput> {
  const imageArrayBuffer = await file.arrayBuffer();
  const imageBuffer = Buffer.from(imageArrayBuffer);
  const imageMimeType = file.type as ImageMimeType
  const imageExt = mimeToExt.get(imageMimeType) as ImageExtension;
  const imagePath = path.join('uploads', table, `${uuid}.${imageExt}`);
  const imageFullPath = path.join(process.cwd(), 'public', imagePath);
  await fs.writeFile(imageFullPath, imageBuffer);
  return {
    uuid,
    path: '/' + imagePath,
    slug: uuid,
    mimeType: imageMimeType,
  };
}

/**
 * @param imagePath Относительный путь, где корень - папка public
 */
export async function deleteImage(imagePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  try {
    await fs.unlink(fullPath);
  }
  catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") 
      throw new Error(`Файл ${fullPath} не найден.`)

    throw error;
  }
}

/**
 * Скачивает файл по указанному пути и возвращает объект File (если найден)
 * Функция нужна для обновления изображения рецепта (например) через форму
 */
// export async function urlToFile(url: string): File | null {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   return new File([blob], filename, { type: mimeType });
// }
