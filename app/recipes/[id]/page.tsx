import { notFound } from 'next/navigation';
import Image from 'next/image';

import { Box, Typography, Stack } from '@mui/material'

import prisma from "@/lib/prisma";

type PageProps = {
  params: {
    id: string
  }
}

export default async function({ params }: PageProps) {
  const id = parseInt(params.id);

  const recipe = await prisma.recipe.findUnique({
    where: { id },
    include: {
      ingredients: {
        include: {
          product: true, // чтобы сразу получить данные продукта
        },
      },
    },
  });

  const totals = recipe?.ingredients.reduce((acc, item) => {
    const factor = item.amount / 100; // макросы обычно на 100 г
    acc.calories += item.product.calories * factor;
    acc.protein += item.product.protein * factor;
    acc.fat += item.product.fat * factor;
    acc.carbs += item.product.carbs * factor;
    return acc;
  }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

  if (recipe === null) notFound();

  return (
    <Stack p={2} spacing={2} alignItems='flex-start'>
      <Typography variant='h3'>
        {recipe.name}
      </Typography>

      <Image src={`/recipes/${recipe.slug}.jpg`} alt={recipe.name} width={400} height={300} />

      <Stack>
        {
          recipe.ingredients.map(ing => (
            <Stack direction='row' spacing={1} justifyContent='space-between'>
              <Typography sx={{ flexGrow: 1 }}>
                {ing.product?.name}
              </Typography>
              <Typography sx={{ flexBasis: 150 }}>
                {ing.amount} {ing.unit}
              </Typography>
            </Stack>
          ))
        }
      </Stack>

      <Stack direction='row' spacing={2}>
        <Typography>
          Калории: {totals?.calories.toFixed(2)}
        </Typography>
        <Typography>
          Белки: {totals?.protein.toFixed(2)}
        </Typography>
        <Typography>
          Жиры: {totals?.fat.toFixed(2)}
        </Typography>
        <Typography>
          Углеводы: {totals?.carbs.toFixed(2)}
        </Typography>

      </Stack>
    </Stack>
  );

}
