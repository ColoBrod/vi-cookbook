'use client'

import { TextField, Button, Box, Stack, Checkbox, FormLabel, FormGroup, FormControlLabel } from "@mui/material";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { productSchema, ProductFormValues } from '@/lib/validation/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { slugify } from 'transliteration';
import { useHttpRequest } from '@/hooks/useHttpRequest';

import { defaultValues } from './defaultValues'
import { Unit } from '@/app/generated/prisma';

const allUnits: Unit[] = Object.values(Unit);

interface ProductFormProps {
  product?: ProductFormValues;
}

export default function ProductForm({ product }: ProductFormProps) {
  const makeRequest = useHttpRequest();
  const { 
    handleSubmit, control, formState: { errors }, reset, setValue
  } = useForm<ProductFormValues>({ 
    defaultValues: product?.id ? product : defaultValues,
    resolver: zodResolver(productSchema),
  });
  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack p={2} spacing={2}>
        <Controller 
          name="name"
          control={control}
          render={({ field, fieldState: {error} }) => (
            <TextField 
              {...field}
              autoFocus
              type='text'
              label="Название продукта"
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
          name="availableUnits"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Box>
              <FormLabel component="legend">
                Единицы измерения
              </FormLabel>
              <FormGroup row>
                {allUnits.map((unit) => (
                  <FormControlLabel
                    key={unit}
                    label={unit}
                    control={
                      <Checkbox
                        checked={field.value?.includes(unit) ?? false}
                        onChange={(e) => {
                          const currentUnits = field.value ?? [];
                          if (e.target.checked) field.onChange([...currentUnits, unit]);
                          else field.onChange(currentUnits.filter((item) => item !== unit));
                        }}
                      />
                    }
                  />
                ))}
              </FormGroup>
              {error && (
                <Box
                  sx={{
                    color: 'error.main',
                    fontSize: '0.75rem',
                    mt: 0.5,
                    ml: 1.75,
                  }}
                >
                  {error.message}
                </Box>
              )}
            </Box>
          )}
        />
        <Controller 
          name="calories"
          control={control}
          // rules={{ 
          //   required: 'Укажи калорийность',
          //   min: { value: 0, message: 'Калорийность не может быть отрицательной' }
          // }}
          render={({ field, fieldState: {error} }) => (
            <TextField 
              {...field}
              type='number'
              label="Калории"
              inputProps={{ step: 0.01 }}
              error={!!error}
              helperText={error?.message}
              onChange={e => field.onChange(Number(e.target.value))}
            />
          )}
        />
        <Controller 
          name="protein"
          control={control}
          // rules={{ 
          //   required: 'Укажи кол-во белков',
          //   min: { value: 0, message: 'Количество белков не может быть отрицательным' }
          // }}
          render={({ field, fieldState: {error} }) => (
            <TextField 
              {...field}
              type='number'
              label="Белки"
              inputProps={{ step: 0.01 }}
              error={!!error}
              helperText={error?.message}
              onChange={e => field.onChange(Number(e.target.value))}
            />
          )}
        />
        <Controller 
          name="fat"
          control={control}
          // rules={{ 
          //   required: 'Укажи кол-во жиров',
          //   min: { value: 0, message: 'Количество жиров не может быть отрицательным' }
          // }}
          render={({ field, fieldState: {error} }) => (
            <TextField 
              {...field}
              type='number'
              label="Жиры"
              inputProps={{ step: 0.01 }}
              error={!!error}
              helperText={error?.message}
              onChange={e => field.onChange(Number(e.target.value))}
            />
          )}
        />
        <Controller 
          name="carbs"
          control={control}
          // rules={{ 
          //   required: 'Укажи кол-во углеводов',
          //   min: { value: 0, message: 'Количество углеводов не может быть отрицательным' }
          // }}
          render={({ field, fieldState: {error} }) => (
            <TextField 
              {...field}
              type='number'
              label="Углеводы"
              inputProps={{ step: 0.01 }}
              error={!!error}
              helperText={error?.message}
              onChange={e => field.onChange(Number(e.target.value))}
            />
          )}
        />

        <Stack direction='row' spacing={2}>
          <Button type="button" variant="outlined" onClick={() => reset()}>
            Сбросить
          </Button>
          <Button type="submit" variant="contained">
            Добавить
          </Button>
        </Stack>
      </Stack>
      
    </form>
  );

  function onSubmit(data: ProductFormValues): void {
    const url = product ? `/api/products/${product.id}` : `/api/products`;
    const config = {
      method: product ? 'put' : 'post',
      data,
    };
    const callback = {
      onTry: () => router.push('/products'),
    };
    const notification = {
      success: product 
        ? `Продукт "${product.name}" обновлен`
        : `Продукт создан`,
    };
    makeRequest({ url, config, callback, notification });

  }
}
