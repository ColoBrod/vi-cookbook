'use client'

import axios from 'axios';
import { Fragment, useState } from 'react';
import { TextField, Button, Box, Stack, Autocomplete, Divider, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from 'next/navigation';
import { FormRecipeTag, RecipeJoined } from '@/types/recipes';
import { FormRecipeItem } from '@/types/recipes';
import { slugify } from 'transliteration';
import { zodResolver } from "@hookform/resolvers/zod";

import { DEFAULT_RECIPE_IMAGE_URL } from '@/constants/images';
import { RecipeFormValues, recipeSchema } from '@/lib/validation/recipes';
import { IngredientType } from '@/app/generated/prisma';
import { error } from 'console';

interface RecipeFormProps {
  recipe?: RecipeFormValues;
  imagePath?: string;
  items: FormRecipeItem[];
  tags: FormRecipeTag[];
}

const defaultValues: RecipeFormValues = {
  slug: "",
  name: "",
  description: null,
  instructions: null,
  image: null,
  tags: [],
  items: [],
}

export default function RecipeForm({ 
  recipe, items, tags: tagsAvailable, imagePath 
}: RecipeFormProps) {

  const router = useRouter();
  const { register, handleSubmit, control, setValue, getValues } = useForm<RecipeFormValues>({ 
    resolver: zodResolver(recipeSchema),
    defaultValues: recipe?.id ? recipe : defaultValues,
  });
  const { fields, append, remove } = useFieldArray({ name: 'items', control });
  const image = register('image');
  const [imagePreview, setImagePreview] = useState(imagePath ?? DEFAULT_RECIPE_IMAGE_URL);

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack spacing={2} alignItems='flex-start'>
            <Controller 
              name="name"
              control={control}
              render={({ field, fieldState: {error} }) => (
                <TextField 
                  {...field}
                  autoFocus
                  type='text'
                  label="Название рецепта"
                  error={!!error}
                  helperText={error?.message}
                  onChange={(e) => {
                    const { value } = e.currentTarget;
                    setValue('name', value);
                    setValue('slug', slugify(value));
                  }}
                />
              )}
            />
            <Controller 
              name="slug"
              control={control}
              render={({ field, fieldState: {error} }) => (
                <TextField 
                  {...field}
                  type='text'
                  label="Название для ссылки"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Controller 
              name="description"
              control={control}
              rules={{}}
              render={({ field }) => (
                <TextField 
                  {...field}
                  type='text'
                  multiline
                  label='Описание'
                  value={field.value === null ? "" : field.value}
                  fullWidth
                  minRows={5}
                  maxRows={5}
                  onChange={e => field.onChange(e.target.value || null)}
                />
              )}
            />
            <Controller 
              name="instructions"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field}
                  value={field.value === null ? "" : field.value}
                  type='text'
                  multiline
                  label='Инструкции по приготовлению'
                  fullWidth
                  minRows={5}
                  maxRows={5}
                  onChange={e => field.onChange(e.target.value || null)}
                />
              )}
            />
            {/*
            <Controller 
              name='description'
              render={({ field, fieldState: { error } }) => (
            />
            */}
            <input
              ref={image.ref}
              type="file"
              accept="image/*"
              id="upload-image"
              style={{ display: 'none' }}
              onChange={(e) => {
                const files = e.currentTarget.files as FileList;
                if (files.length !== 1) {
                  setValue('image', null);
                  setImagePreview(DEFAULT_RECIPE_IMAGE_URL);
                  return;
                }
                const file = files[0];
                setValue('image', file);
                const imageUrl = URL.createObjectURL(file);
                setImagePreview(imageUrl);
              }}
            />
            <label htmlFor="upload-image">
              <Button variant="contained" component="span">
                Загрузить изображение
              </Button>
            </label>
            <Button variant='outlined' onClick={() => {
              setValue('image', null)
              setImagePreview(DEFAULT_RECIPE_IMAGE_URL);
            }}>
              Очистить изображение
            </Button>
            <Box sx={{
              backgroundImage: `url(${imagePreview})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: 400,
              height: 300,
            }}/>
            <Controller 
              name='tags'
              control={control}
              render={({ field, fieldState: { error }}) => (
                <Fragment>
                  <InputLabel id="tags-label">
                    Категории
                  </InputLabel>
                  <Select
                    {...field}
                    labelId='tags-label'
                    multiple
                    error={!!error}
                    fullWidth
                  >
                    {tagsAvailable.map(tag => (
                      <MenuItem key={tag.id} value={tag.id}>
                        {tag.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Fragment>
              )}
            />
            <Button
              type="button"
              variant="outlined"
              onClick={() => append({ ingredientUuid: "", amount: 0, type: IngredientType.PRODUCT })}
            >
              Добавить ингредиент
            </Button>
          </Stack>
          <Divider />
          <Stack py={2} spacing={2}>
            {fields.map((field, index) => (
              <Stack direction='row' spacing={1} key={field.id} alignItems='flex-start'>
                <Controller
                  name={`items.${index}.ingredientUuid`}
                  control={control}
                  render={({ field: ctrlField, fieldState: { error } }) => (
                    <Autocomplete 
                      options={items}
                      getOptionLabel={option => option.name}
                      onChange={(_, val) => {
                        // Обновляем ingredientUuid
                        ctrlField.onChange(val?.uuid ?? "");
                        // Обновляем type соответствующего поля
                        setValue(`items.${index}.type`, val?.type ?? IngredientType.PRODUCT);
                      }}
                      value={items.find((p) => p.uuid === ctrlField.value) ?? null}
                      sx={{ flexGrow: 1 }}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label="Ингредиент" 
                          error={!!error}
                          helperText={error?.message}
                          sx={{ flexGrow: 1 }}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name={`items.${index}.amount`}
                  control={control}
                  render={({ field, fieldState: {error} }) => (
                    <TextField 
                      {...field} 
                      type="number" 
                      label="Amount" 
                      inputProps={{ step: 0.01 }}
                      onChange={e => field.onChange(Number(e.target.value))}
                      error={!!error}
                      helperText={error?.message}
                      sx={{ width: 120 }} 
                    />
                  )}
                />

                <Button sx={{ height: 56 }} variant='outlined' color='error' onClick={() => remove(index)}>
                  <DeleteIcon />
                </Button>
              </Stack>
            ))}
          </Stack>
          {fields.length > 0 && (
            <>
              <Divider />
              <Button type='submit' variant='contained'>
                Сохранить рецепт
              </Button>
            </>
          )}
        </Stack>
      </form>
    </Box>
  );

  async function onSubmit(formValues: RecipeFormValues): Promise<void> {
    const formData = new FormData();
    const { image, ...data } = formValues;
    formData.append('data', JSON.stringify(data));
    if (image instanceof File) formData.append('image', image);

    try {
      if (recipe?.slug) {
        await axios.put(
          `/api/recipes/${recipe.id}`, 
          formData, 
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        router.push(`/recipes/${recipe.slug}`);
      }
      else {
        const response = await axios.post<RecipeJoined>(
          '/api/recipes', 
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const slug = response.data.recipe.slug;
        router.push(`/recipes/${slug}`);
      }
    }
    catch (e) {

    }
    finally {
      
    }
  }

}
