import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Typography, Stack, Grid } from '@mui/material'
import { getRecipeById } from '@/model/recipe';
import { unitMap } from '@/constants/units';
import { RecipeJoined } from '@/types/recipes';

// type RecipeJoined = NonNullable<Awaited<ReturnType<typeof getRecipeById>>>;

interface Totals {
  yield: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function({ params }: PageProps) {
  const id = parseInt((await params).id);
  const recipe = await getRecipeById(id);
  if (recipe === null) notFound();
  const totals = getTotals(recipe);
  console.log('updatedAt', recipe.updatedAt);
  // const updatedAt = recipe.updatedAt;

  return (
    <Stack p={2} spacing={2} alignItems='flex-start'>
      <Typography variant='h5'>{recipe.name}</Typography>
      {/*
        <Typography variant='body1'>Обновлено: {recipe.updatedAt.toLocaleDateString('ru')}</Typography>
      */}
      <Image src={`/recipes/${recipe.slug}.jpg`} alt={recipe.name} width={400} height={300} />
      <Typography variant='h6'>Ингредиенты</Typography>
      <Grid container spacing={1}>
        {recipe.ingredients.map(ing => (
          <Fragment key={ing.id}>
            <Grid size={8}>
              <Typography>
                {ing.product?.name}
              </Typography>
            </Grid>
            <Grid size={4}>
              <Typography>
                {ing.amount} {unitMap.get(ing.unit)}
              </Typography>
            </Grid>
          </Fragment>
        ))}
        <Grid size={8}>
          <Typography fontWeight='bold'>
            Выход:
          </Typography>
        </Grid>
        <Grid size={4}>
          <Typography fontWeight='bold'>
            {totals.yield} г
          </Typography>
        </Grid>
      </Grid>
      <Typography variant='h6'>Пищевая ценность</Typography>
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

  function getTotals(recipe: RecipeJoined): Totals {
    return recipe.ingredients.reduce((acc, item) => {
      const factor = item.amount / 100; // макросы обычно на 100 г
      acc.yield += item.amount;
      acc.calories += item.product?.calories ?? 0 * factor;
      acc.protein += item.product?.protein ?? 0 * factor;
      acc.fat += item.product?.fat ?? 0 * factor;
      acc.carbs += item.product?.carbs ?? 0 * factor;
      return acc;
    }, { yield: 0, calories: 0, protein: 0, fat: 0, carbs: 0 });
  }

}
