'use client'

import axios from 'axios';
import { TextField, Button, Box, Stack, Autocomplete, Divider } from "@mui/material";
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import DeleteIcon from "@mui/icons-material/Delete";
import { type Product } from '@/app/generated/prisma';
import { useRouter } from 'next/navigation';
import { RecipeJoined } from '@/types/recipes';

export interface FormValues {
  id?: number;
  slug?: string;
  name: string;
  ingredients: {
    type: 'product' | 'recipe';
    productId?: number;
    amount?: number;
    // unit: 
  }[]
}

const defaultValues: FormValues = {
  slug: "",
  name: "",
  ingredients: [],
}

interface RecipeFormProps {
  recipe?: FormValues;
  products: Product[];
}

export default function RecipeForm({ recipe, products }: RecipeFormProps) {
  const router = useRouter();
  const { 
    handleSubmit, control, formState: { errors }, reset 
  } = useForm<FormValues>({ 
    defaultValues: recipe?.id ? recipe : defaultValues
  });

  const { fields, append, remove } = useFieldArray({ 
    name: 'ingredients',
    control
  });

  return (
    <Box p={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack spacing={2} alignItems='flex-start'>
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
                />
              )}
            />
            <Button
              type="button"
              variant="outlined"
              onClick={() => append({ productId: undefined, amount: undefined })}
            >
              Добавить ингредиент
            </Button>
          </Stack>
          <Divider />
          <Stack py={2} spacing={2}>
            {fields.map((field, index) => (
              <Stack direction='row' spacing={1} key={field.id} alignItems='flex-start'>
                <Controller
                  name={`ingredients.${index}.productId`}
                  control={control}
                  rules={{ required: 'Выбери ингредиент' }}
                  render={({ field: ctrlField, fieldState: { error } }) => (
                    <Autocomplete 
                      options={products}
                      getOptionLabel={option => option.name}
                      onChange={(_, val) => ctrlField.onChange(val?.id ?? "")}
                      value={products.find((p) => p.id === ctrlField.value) ?? null}
                      sx={{ flexGrow: 1 }}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label="Продукт" 
                          error={!!error}
                          helperText={error?.message}
                          sx={{ flexGrow: 1 }}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name={`ingredients.${index}.amount`}
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
    try {
      if (recipe?.id) {
        await axios.put(`/api/recipes/${recipe.id}`, data);
        router.push(`/recipes/${recipe.id}`);
      }
      else {
        const response = await axios.post<RecipeJoined>('/api/recipes', data);
        const id = response.data.id;
        router.push(`/recipes/${id}`);
      }
    }
    catch (e) {

    }
    finally {
      
    }
  }
}
