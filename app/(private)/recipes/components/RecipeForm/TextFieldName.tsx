'use client'

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { slugify } from 'transliteration';

export default function TextFieldName() {
  const { control, setValue } = useFormContext();

  return (
    <Controller 
      name="name"
      control={control}
      render={({ field, fieldState: {error} }) => (
        <TextField 
          {...field}
          fullWidth
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
  );
}

