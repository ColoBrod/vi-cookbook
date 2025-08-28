'use client'

import axios from 'axios';
import { TextField, Button, Box, Stack, Autocomplete, Divider, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import DeleteIcon from "@mui/icons-material/Delete";
import { type RecipeItem, type Product, IngredientType } from '@/app/generated/prisma';
import { useRouter } from 'next/navigation';
import { FormRecipeTag, RecipeJoined } from '@/types/recipes';
import { FormRecipeItem } from '@/types/recipes';
import { slugify } from 'transliteration';
import { error } from 'node:console';
import { Fragment } from 'react';

export interface FormValues {
  id?: number;
  slug?: string;
  name: string;
  tags: number[];
  // tags: {
  //   id: number;
  // }[];
  items: {
    type?: IngredientType;
    ingredientUuid?: string;
    amount?: number;
  }[]
}

const defaultValues: FormValues = {
  slug: "",
  name: "",
  tags: [],
  items: [],
}

interface RecipeFormProps {
  recipe?: FormValues;
  items: FormRecipeItem[];
  tags: FormRecipeTag[];
}

export default function RecipeForm({ recipe, items, tags: tagsAvailable }: RecipeFormProps) {
  const router = useRouter();
  const { 
    getValues, handleSubmit, control, formState: { errors }, reset, setValue
  } = useForm<FormValues>({ 
    defaultValues: recipe?.id ? recipe : defaultValues
  });

  const { fields, append, remove } = useFieldArray({ name: 'items', control });

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack spacing={2} alignItems='flex-start'>
            <Controller 
              name="name"
              control={control}
              rules={{ 
                required: 'Название рецепта обязательно' 
              }}
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
                  label="ID рецепта"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
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
              onClick={() => append({ ingredientUuid: undefined, amount: undefined, type: undefined })}
            >
              Добавить ингредиент
            </Button>
          </Stack>
          <Divider />
          <Stack py={2} spacing={2}>
            {fields.map((field, index) => (
              <Stack direction='row' spacing={1} key={index} alignItems='flex-start'>
                <Controller
                  name={`items.${index}.ingredientUuid`}
                  control={control}
                  rules={{ required: 'Выбери ингредиент' }}
                  render={({ field: ctrlField, fieldState: { error } }) => (
                    <Autocomplete 
                      options={items}
                      getOptionLabel={option => option.name}
                      onChange={(_, val) => {
                        // Обновляем ingredientUuid
                        ctrlField.onChange(val?.uuid ?? "");
                        // Обновляем type соответствующего поля
                        setValue(`items.${index}.type`, val?.type ?? undefined);
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
                  rules={{ 
                    required: 'Укажи Amount',
                    min: { value: 0, message: 'Amount не может быть отрицательным' }
                  }}
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
                {/*
                  <IconButton onClick={() => remove(index)}>
                  </IconButton>
                */}
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

  async function onSubmit(data: FormValues): Promise<void> {
    console.log(data);
    try {
      if (recipe?.slug) {
        await axios.put(`/api/recipes/${recipe.id}`, data);
        router.push(`/recipes/${recipe.slug}`);
      }
      else {
        const response = await axios.post<RecipeJoined>('/api/recipes', data);
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
