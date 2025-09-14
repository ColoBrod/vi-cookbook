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
