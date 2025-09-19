'use client'

import { Controller, FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form"
import { RecipeFormValues } from "@/lib/validation/recipes"
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { IngredientType } from "@/app/generated/prisma";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormRecipeItem } from "@/types/recipes";

interface IngredientProps {
  field: FieldArrayWithId<RecipeFormValues, 'items', 'id'>
  index: number;
  items: FormRecipeItem[];
}

export default function Ingredient({ items, field, index }: IngredientProps) {
  const { control, setValue } = useFormContext();
  const { remove } = useFieldArray({ name: 'items', control });

  return (
    <Stack direction='row' spacing={1} key={field.id} alignItems='flex-start'>
      <Controller
        name={`items.${index}.ingredientUuid`}
        control={control}
        render={({ field: ctrlField, fieldState: { error } }) => (
          <Autocomplete 
            options={items}
            getOptionLabel={option => option.name}
            onChange={(_, val) => {
              // Обновляем ingredientUuid
              ctrlField.onChange(val?.uuid ?? "");
              // Обновляем type соответствующего поля
              setValue(`items.${index}.type`, val?.type ?? IngredientType.PRODUCT);
            }}
            value={items.find((p) => p.uuid === ctrlField.value) ?? null}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Ингредиент" 
                error={!!error}
                helperText={error?.message}
                // size={{ xs: "small", lg: "medium" }}
                sx={{ flexGrow: 1 }}
              />
            )}
          />
        )}
      />

      <Controller
        name={`items.${index}.amount`}
        control={control}
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
    </Stack>
  );
}

