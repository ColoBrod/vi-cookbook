import { ImageExtension, ImageMimeType } from "@/types/images";

export const DEFAULT_RECIPE_IMAGE_URL = '/recipes/default.jpg';

export const mimeToExt = new Map<ImageMimeType, ImageExtension>([
  ['image/jpeg'   , 'jpg'],
  ['image/jpg'    , 'jpg'],
  ['image/png'    , 'png'],
  ['image/webp'   , 'webp'],
  ['image/bmp'    , 'bmp'],
  // ['image/gif'    , 'gif'],
  // ['image/svg+xml', 'svg'],
]);

// export const mimeRec: Record<ImageMimeType, ImageExtension> = {
//   'image/jpeg': 'jpg',
//   'image/jpg':   'jpg',
//   'image/png':   'png',
//   'image/webp':  'webp',
//   'image/bmp':   'bmp',
// }

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_MIME_TYPES: string[] = [...mimeToExt.keys()];
export const ACCEPTED_EXTENSIONS: string[] = [...mimeToExt.values()];
