import path from "node:path";
import fs from 'node:fs/promises';

import { RecipesAddDto } from "@/types/dto";

type ImageMimeType = 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/gif' | 'image/webp' | 'image/svg+xml' | 'image/bmp' | 'image/x-icon';
type ImageExtension = 'jpg' | 'jpg' | 'png' | 'gif' | 'webp' | 'svg' | 'bmp' | 'ico';

export const mimeToExt = new Map<ImageMimeType, ImageExtension>([
  ['image/jpeg'   , 'jpg'],
  ['image/jpg'    , 'jpg'],
  ['image/png'    , 'png'],
  ['image/gif'    , 'gif'],
  ['image/webp'   , 'webp'],
  ['image/svg+xml', 'svg'],
  ['image/bmp'    , 'bmp'],
]);

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
