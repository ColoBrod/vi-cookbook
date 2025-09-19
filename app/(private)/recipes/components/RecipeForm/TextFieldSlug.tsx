'use client'

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function TextFieldSlug() {
  const { control } = useFormContext();

  return (
    <Controller 
      name="slug"
      control={control}
      render={({ field, fieldState: {error} }) => (
        <TextField 
          {...field}
          fullWidth
          type='text'
          label="Название для ссылки"
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}
