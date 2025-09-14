import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Typography, Stack, Grid, Box, Link } from '@mui/material'
import { getRecipeBySlugOrUuid, getRecipeProductsWeight } from '@/model/recipe';
import { unitMap } from '@/constants/units';
import { getRecipeImagePath } from '@/lib/recipe';
import RecipeCalculateForm from '../components/RecipeCalculateForm';
import RecipeTag from '../components/RecipeTag';
import MuiMarkdown from 'mui-markdown';
import { IngredientType } from '@/app/generated/prisma';
import NextLink from 'next/link';

// import Link from 'next/link';

interface Totals {
  yield: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

type PageProps = {
  params: Promise<{
    slug: string
  }>;
  searchParams: Promise<{
    weight: string;
  }>;
}

export default async function({ params, searchParams }: PageProps) {
  const slug = (await params).slug;
  const weight = parseInt((await searchParams)?.weight);
  const { recipe, table } = await getRecipeBySlugOrUuid(slug) ?? notFound();
  // const productsWeight = await getRecipeProductsWeight(recipe.id);
  const totals = getTotals();
  const weightFactor = weight / totals.yield;
  const imagePath = getRecipeImagePath(recipe.slug);

  console.log(table);

  return (
    <Stack p={2} spacing={2} alignItems='flex-start'>

      <Typography variant='h5'>{recipe.name}</Typography>

      <Image 
        src={imagePath} 
        alt={recipe.name} 
        width={400} 
        height={300} 
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <Stack direction='row' spacing={1}>
        {recipe.tags.map(tag => <RecipeTag key={tag.id} {...tag} disabled />)}
      </Stack>

      <Stack spacing={1}>
        <Typography variant='h6'>Описание:</Typography>
        <Typography variant='body1'>
          {recipe.description || 'Описание отсутствует'}
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant='h6'>Инструкции по приготовлению:</Typography>
        <MuiMarkdown>
          {recipe.instructions || 'Иснтрукции отсутствуют'}
        </MuiMarkdown>
      </Stack>

      <Typography variant='h6'>Рассчитать на:</Typography>
      <RecipeCalculateForm weight={totals.yield} />

      <Typography variant='h6'>Ингредиенты</Typography>
      <Grid container spacing={1}>
        {table.map(row => (
          <Fragment key={row.uuid}>
            <Grid size={8}>
              {
                row.type === IngredientType.PRODUCT
                  ? (
                    <Typography>
                      {row.name}
                    </Typography>
                  )
                  : (
                    <Link component={NextLink} href={`/recipes/${row.uuid}`} variant='body1'>
                      {row.name}
                    </Link>
                  )
              }
            </Grid>
            <Grid size={4}>
              <Typography>
                {adjustToWeight(row.amount).toFixed(2)} {unitMap.get(row.unit)}
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
            {isNaN(weight) ? totals.yield.toFixed(2) : weight.toFixed(2)} г
          </Typography>
        </Grid>
      </Grid>

      <Typography variant='h6'>Пищевая ценность</Typography>
      <Stack direction='row' spacing={2}>
        <Typography>
          Калории: {adjustToWeight(totals.calories).toFixed(2)}
        </Typography>
        <Typography>
          Белки: {adjustToWeight(totals.protein).toFixed(2)}
        </Typography>
        <Typography>
          Жиры: {adjustToWeight(totals.fat).toFixed(2)}
        </Typography>
        <Typography>
          Углеводы: {adjustToWeight(totals.carbs).toFixed(2)}
        </Typography>
      </Stack>

    </Stack>
  );

  // function mapTable(initialTable: RecipeTable): RecipeTable {
  //   const table = structuredClone(initialTable);
  //   if (isNaN(weight)) return table;
  //   const factor = weight / totals.yield;
  //   table.forEach((row, index) => {
  //     table[index].amount *= factor;
  //   });
  // }

  // function formatWeight(input: number): string {
  //   const weight = adjustWeight(input);
  //   return weight.toFixed(2) + ' г'
  //
  // }

  function adjustToWeight(input: number): number {
    if (isNaN(weight)) return input;
    return input * weightFactor;
  }

  function getTotals(): Totals {
    const totals = table.reduce((acc, item) => {
      const factor = item.amount / 100; // макросы обычно на 100 г
      acc.yield += item.amount;
      acc.calories += item.calories * factor;
      acc.protein += item.protein * factor;
      acc.fat += item.fat * factor;
      acc.carbs += item.carbs * factor;
      return acc;
    }, { yield: 0, calories: 0, protein: 0, fat: 0, carbs: 0})

    return totals;

    // if (isNaN(weight)) return totals;
    //
    // const weightFactor = weight / totals.yield;
    //
    // for (const [key, value] of Object.entries(totals)) {
    //   if (key === 'yield') continue;
    //   // @ts-ignore
    //   totals[key] *= weightFactor;
    // }
    // return totals;

    // return recipe.items.reduce((acc, item) => {
    //   const factor = item.amount / 100; // макросы обычно на 100 г
    //   acc.yield += item.amount;
    //   acc.calories += item.product?.calories ?? 0 * factor;
    //   acc.protein += item.product?.protein ?? 0 * factor;
    //   acc.fat += item.product?.fat ?? 0 * factor;
    //   acc.carbs += item.product?.carbs ?? 0 * factor;
    //   return acc;
    // }, { yield: 0, calories: 0, protein: 0, fat: 0, carbs: 0 });
  }

}
