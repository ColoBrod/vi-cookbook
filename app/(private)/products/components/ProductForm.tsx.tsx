'use client'

import axios from 'axios';
import { TextField, Button, Box, Stack } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { productSchema, ProductFormValues } from '@/lib/validation/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { slugify } from 'transliteration';
import { useHttpRequest } from '@/hooks/useHttpRequest';

// interface FormValues {
//   slug?: string;
//   name: string;
//   calories?: number;
//   protein?: number;
//   fat?: number;
//   carbs?: number;
// }

const defaultValues: ProductFormValues = {
  slug: "",
  name: "",
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
}

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
        {/*
        <FormControl>
          <InputLabel id="categories-label">Категории</InputLabel>
          <Select
            id="categories"
            name="categories"
            labelId="categories-label"
            multiple
            defaultValue={[]}
          >
            {categories.map(category => (
              <MenuItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        */}

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

    // if (product) {
    //   makeRequest({
    //     url: '/api/products',
    //     config: {
    //
    //     }
    //
    //   })
    // }
    // else {
    //
    // }
    // axios.post('/api/products', data)
    //   .then(() => router.push('/products'));
  }

  // function onError(data: FormValues): void {
  //   console.log(data);
  // }

  /*
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
  }
  */
}
