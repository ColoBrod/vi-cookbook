'use client'

import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export default function TextFieldInstructions() {
  const { control } = useFormContext();
  return (
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
  );
}

