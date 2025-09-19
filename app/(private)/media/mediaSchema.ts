import { z } from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_MIME_TYPES, ACCEPTED_EXTENSIONS } from '@/constants/images';

export const mediaSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'Загружаемое изображение слишком большое (максимум 5МБ)'
    })
    .refine((file) => ACCEPTED_MIME_TYPES.includes(file.type), {
      message: `Недопустимый формат изображения (допустимы: ${ACCEPTED_EXTENSIONS.join(', ')})`
    })
    .or(z.null()),
});

export type MediaFormValues = z.infer<typeof mediaSchema>;
