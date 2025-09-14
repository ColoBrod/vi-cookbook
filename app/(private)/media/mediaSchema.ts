import { z } from 'zod';
import { mimeToExt } from '@/constants/images';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_MIME_TYPES: string[] = [...mimeToExt.keys()];

export const mediaSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'Загружаемое изображение слишком большое (максимум 5МБ)'
    })
    .refine((file) => ACCEPTED_MIME_TYPES.includes(file.type), {
      message: 'Недопустимый формат изображения'
    })
    .or(z.null()),
});

export type MediaFormValues = z.infer<typeof mediaSchema>;
