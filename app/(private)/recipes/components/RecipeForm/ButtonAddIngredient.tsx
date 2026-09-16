'use client'

import { IngredientType } from "@/app/generated/prisma";
import { Button } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

interface ButtonAddIngredientProps {
  handleAdd: Function
}

export default function ButtonAddIngredient({ handleAdd: append }: ButtonAddIngredientProps) {
  const { control } = useFormContext();
  // const { append } = useFieldArray({ name: 'items', control });

  return (
    <Button
      type="button"
      variant="outlined"
      onClick={() => append({ 
        ingredientUuid: "", amount: 0, type: IngredientType.PRODUCT 
      })}
    >
      Добавить ингредиент
    </Button>
  );
}

