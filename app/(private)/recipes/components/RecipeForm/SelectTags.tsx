'use client'

import { InputLabel, MenuItem, Select } from "@mui/material";
import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormRecipeTag } from "@/types/recipes";

interface SelectTagsProps {
  tagsAvailable: FormRecipeTag[];
}

export default function SelectTags({ tagsAvailable }: SelectTagsProps) {
  const { control } = useFormContext();

  return (
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
  );
}

