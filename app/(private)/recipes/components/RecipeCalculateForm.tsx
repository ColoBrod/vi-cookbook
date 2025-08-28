'use client';

import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Stack, Button, TextField, InputAdornment } from "@mui/material";

interface FormValues {
  weight: number;
}

export default function RecipeCalculateForm({ weight }: FormValues) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { getValues, handleSubmit, control, formState: {errors}, reset } = useForm<FormValues>({
    defaultValues: { weight }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='row' spacing={1}>
        <Controller 
          name="weight"
          control={control}
          rules={{ 
            required: 'Укажи выход для рецепта',
            min: { value: 0, message: 'Вес не может быть отрицательным' }
          }}
          render={({ field, fieldState: {error} }) => (
            <TextField 
              {...field}
              size="small"
              type='number'
              label="Выход (г)"
              inputProps={{ step: 0.01 }}
              onChange={e => field.onChange(Number(e.target.value))}
              error={!!error}
              helperText={error?.message}
              // InputProps={{
              //   startAdornment: <InputAdornment position="start">г.</InputAdornment>
              // }}
            />
          )}
        />
        <Button type='submit' variant='contained'>
          Применить
        </Button>
        <Button type='reset' variant='outlined' onClick={handleReset}>
          По умолчанию
        </Button>
      </Stack>
    </form>
  );

  function handleReset() {
    reset();
    const params = new URLSearchParams(searchParams.toString());
    params.delete('weight');
    router.push(`?${params.toString()}`);
  }

  function onSubmit({ weight }: FormValues): void {
    const params = new URLSearchParams(searchParams.toString());
    params.set('weight', weight.toString());
    router.push(`?${params.toString()}`);
  }
}

