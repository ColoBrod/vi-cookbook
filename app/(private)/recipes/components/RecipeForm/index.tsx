'use client'

import { useRef } from 'react';
import { Button, Box, Stack, Divider, Grid } from "@mui/material";
import { useForm, useFieldArray, FieldErrors, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FormRecipeTag } from '@/types/recipes';
import { FormRecipeItem } from '@/types/recipes';
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeFormValues, recipeSchema } from '@/lib/validation/recipes';
import { Media, Recipe } from '@/app/generated/prisma';
import MediaForm from '@/app/(private)/media/MediaForm';
import { useHttpRequest } from '@/hooks/useHttpRequest';

// Components
import TextFieldName from './TextFieldName';
import TextFieldSlug from './TextFieldSlug';
import TextFieldDescription from './TextFieldDescription';
import TextFieldInstructions from './TextFieldInstructions';
import SelectTags from './SelectTags';
import Ingredient from './Ingredient';
import ButtonAddIngredient from './ButtonAddIngredient';

interface RecipeFormProps {
  recipe?: RecipeFormValues;
  image: Media | null;
  items: FormRecipeItem[];
  tags: FormRecipeTag[];
}

const defaultValues: RecipeFormValues = {
  slug: "",
  name: "",
  description: null,
  instructions: null,
  imageId: null,
  tags: [],
  items: [],
}

export default function RecipeForm({ 
  recipe, image, items, tags: tagsAvailable
}: RecipeFormProps) {

  const router = useRouter();
  const makeRequest = useHttpRequest();
  const imageRef = useRef<Media|null>(null);

  const formMethods = useForm<RecipeFormValues>({ 
    resolver: zodResolver(recipeSchema),
    defaultValues: recipe?.id ? recipe : defaultValues,
  });
  const { handleSubmit, control } = formMethods; 

  const { fields, append, remove } = useFieldArray({ name: 'items', control });

  return (
    <FormProvider {...formMethods}>
      <Box p={2} component='form' onSubmit={handleSubmit(onValid, onInvalid)}>
        <Stack spacing={2}>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8, xl: 6 }}>
              <Stack spacing={2} alignItems='flex-start'>
                <TextFieldName />
                <TextFieldSlug />
                <TextFieldDescription />
                <TextFieldInstructions />
                <SelectTags tagsAvailable={tagsAvailable} />
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4, xl: 3 }} >
              <Stack spacing={2}>
                <MediaForm media={image ?? undefined} uploadedRef={imageRef} />
              </Stack>
            </Grid>
          </Grid>

          <ButtonAddIngredient handleAdd={append} />

          <Divider />

          <Stack py={2} spacing={2}>
            {fields.map((field, index) => (
              <Ingredient key={field.id} field={field} index={index} items={items} remove={remove} />
            ))}
          </Stack>

          {fields.length > 0 && <Divider />}

          <Button type='submit' variant='contained'>
            Сохранить рецепт
          </Button>

        </Stack>
      </Box>
    </FormProvider>
  );

  async function onInvalid(errors: FieldErrors<RecipeFormValues>): Promise<void> {
    console.log(imageRef.current);
    console.log(errors);
  }

  async function onValid(formValues: RecipeFormValues): Promise<void> {

    formValues.imageId = imageRef.current?.id ?? formValues.imageId;
    
    const [method, url] = recipe === undefined
      ? ['post', '/api/recipes']
      : ['put', `/api/recipes/${recipe.id}`];

    makeRequest<Recipe>({
      url,
      config: { method, data: formValues },
      callback: {
        onTry: recipe === undefined
          ? ({ data: created }) => router.push(`/recipes/${created.slug}`)
          : ({ data: updated }) => router.push(`/recipes/${updated.slug}`),
      },
      notification: {
        success: recipe === undefined ? 'Рецепт создан' : 'Рецепт обновлен',
      },
    })
  }
}
