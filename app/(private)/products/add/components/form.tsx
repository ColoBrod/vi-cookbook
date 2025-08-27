'use client'

import axios from 'axios';
import { TextField, Button, Box, Stack } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormValues {
  slug?: string;
  name: string;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

const defaultValues: FormValues = {
  slug: "",
  name: "",
}

export default function ProductForm() {
  const { handleSubmit, control, formState: { errors }, reset } = useForm<FormValues>({ defaultValues });
  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack p={2} spacing={2}>
        <Controller 
          name="slug"
          control={control}
          render={({ field, fieldState: {error} }) => (
            <TextField 
              {...field}
              type='text'
              label="ID продукта"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller 
          name="name"
          control={control}
          rules={{ 
            required: 'Название продукта обязательно' 
          }}
          render={({ field, fieldState: {error} }) => (
            <TextField 
              {...field}
              autoFocus
              type='text'
              label="Название продукта"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller 
          name="calories"
          control={control}
          rules={{ 
            required: 'Укажи калорийность',
            min: { value: 0, message: 'Калорийность не может быть отрицательной' }
          }}
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
          rules={{ 
            required: 'Укажи кол-во белков',
            min: { value: 0, message: 'Количество белков не может быть отрицательным' }
          }}
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
          rules={{ 
            required: 'Укажи кол-во жиров',
            min: { value: 0, message: 'Количество жиров не может быть отрицательным' }
          }}
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
          rules={{ 
            required: 'Укажи кол-во углеводов',
            min: { value: 0, message: 'Количество углеводов не может быть отрицательным' }
          }}
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

  function onSubmit(data: FormValues): void {
    axios.post('/api/products', data)
      .then(() => router.push('/products'));
  }

  function onError(data: FormValues): void {
    console.log(data);
  }

  /*
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    console.log(formJson);
  }
  */
}
