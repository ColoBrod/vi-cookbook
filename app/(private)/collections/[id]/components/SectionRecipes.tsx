'use client';

import { Fragment } from 'react'

import Image from 'next/image';
import { Box, Stack, Paper, Typography, Button, TextField } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { CollectionRecipe, Recipe } from '@/app/generated/prisma'
import { useRouter } from 'next/navigation';

import axios, { AxiosResponse } from 'axios';
import { CollectionRecipePatchDto } from '@/types/dto';

interface SectionRecipesProps {
  collectionId: number;
  recipes: Recipe[];
  weightMap: Map<number, number>;
}

export default function SectionRecipes({ collectionId, recipes, weightMap }: SectionRecipesProps) {
  const router = useRouter();
  return (
    <Stack spacing={2}>
      {
        recipes.map(recipe => (
          <Paper key={recipe.uuid}>
            <Stack p={2} direction='row' spacing={2} alignItems='center' useFlexGap>
              <Image src={recipe.imagePath} alt={recipe.name} width={64} height={48} />
              <Typography variant='h6'>
                {recipe.name}
              </Typography>

              <Stack direction='row' spacing={2} marginLeft='auto'>
                <TextField 
                  id={String(recipe.id)}
                  defaultValue={weightMap.get(recipe.id) ?? 0}
                  type='number'
                  // label='Вес (г)'
                  inputProps={{ step: 0.01 }}
                  sx={{ width: 120 }} 
                  onBlur={handleRecipeWeightChange}
                />
                <Button color='error'>
                  <DeleteIcon />
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ))
      }

    </Stack>
  );

  async function handleRecipeWeightChange(event: React.FocusEvent<HTMLInputElement>) {
    const { id, value } = event.currentTarget;
    const weight = Number(value);
    const recipeId = Number(id);
    if (isNaN(weight) || weight <= 0 || isNaN(recipeId)) return;

    try {
      const response = await axios.patch<
        CollectionRecipe, AxiosResponse<CollectionRecipe>, CollectionRecipePatchDto
      >(`/api/collections/${collectionId}`, { recipeId, weight });
      if (response.data) router.refresh();
    }
    catch (e) {}
    finally {}
  }
}

