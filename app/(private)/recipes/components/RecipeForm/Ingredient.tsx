'use client'

import { useState } from "react";
import { Controller, FieldArrayWithId, useFieldArray, UseFieldArrayRemove, useFormContext } from "react-hook-form"
import { RecipeFormValues } from "@/lib/validation/recipes"
import { Autocomplete, Button, Stack, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { IngredientType, Unit } from "@/app/generated/prisma";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormRecipeItem } from "@/types/recipes";

interface IngredientProps {
  field: FieldArrayWithId<RecipeFormValues, 'items', 'id'>
  index: number;
  items: FormRecipeItem[];
  remove: UseFieldArrayRemove;
}

export default function Ingredient({ items, field, index, remove }: IngredientProps) {
  const { control, setValue } = useFormContext();
  const [availableUnits, setAvailableUnits] = useState<Unit[]>(getAvailableUnits());
  const [defaultUnit, setDefaultUnit] = useState<Unit|null>(getDefaultUnit(availableUnits));

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
              console.log(val);
              // Обновляем ingredientUuid
              ctrlField.onChange(val?.uuid ?? "");
              // Обновляем type соответствующего поля
              setValue(`items.${index}.type`, val?.type ?? IngredientType.PRODUCT);
              setAvailableUnits(val?.availableUnits ?? []);
              setDefaultUnit(getDefaultUnit(val?.availableUnits ?? []));
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

      <Controller 
        name={`items.${index}.unit`}
        control={control}
        render={({ field }) => (
          <Select
            id="unit"
            label="Unit"
            defaultValue={defaultUnit ?? ""}
            onChange={e => field.onChange(e.target.value)}
          >
            {availableUnits.map((unit) => (
              <MenuItem value={unit} key={unit}>{unit}</MenuItem>
            ))}
          </Select>
        )}
      />  

      <Button sx={{ height: 56 }} variant='outlined' color='error' onClick={() => remove(index)}>
        <DeleteIcon />
      </Button>

      {/*<Controller
        name={`items.${index}.ingredientUuid`}
        control={control}
        render={({ field }) => (
        )
      />*/}
    </Stack>
  );

  function getDefaultUnit(available: Unit[]): Unit | null {
    if (field.unit) return field.unit;
    const priority = [Unit.G, Unit.ML, Unit.TSP, Unit.TBSP, Unit.PCS];
    for (const unit of priority) if (available.includes(unit)) return unit;
    return null;
  }

  function getAvailableUnits(): Unit[] {
    const uuid = field.ingredientUuid;
    const item = items.find(i => i.uuid === uuid);
    return item?.availableUnits ?? [];
  }
}

