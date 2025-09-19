'use client'

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function TextFieldDescription() {
  const { control } = useFormContext();

  return (
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
  )
}

