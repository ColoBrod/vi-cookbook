
import { Box, Grid, Typography } from "@mui/material";

import { IngredientType } from "@/app/generated/prisma";
import { getCollection, getCollectionProductsWeight } from "@/model/collections";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import SectionRecipes from "./components/SectionRecipes";
import SectionProducts from "./components/SectionProducts";

type PageProps = {
  params: Promise<{
    id: string
  }>;
}

type UUID = string;
type Ingredient = {
  // name: string;
  weight: number;
}
type IngredientWeight = Map<UUID, Ingredient>;

export default async function({ params }: PageProps) {
  const id = parseInt((await params).id);
  if (isNaN(id)) notFound();
  const collection = await getCollection(id);
  if (collection === null) notFound();

  const products = await getCollectionProductsWeight(id);
  const recipeIdToWeight = new Map<number, number>();

  const recipes = collection.recipes.map(cr => {
    const { recipeId, weight } = cr;
    const { items, ...rest } = cr.recipe;
    recipeIdToWeight.set(recipeId, weight);
    return rest;
  });

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionRecipes {...{
            recipes,
            weightMap: recipeIdToWeight,
            collectionId: id,
          }}/>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionProducts {...{products}} />
        </Grid>
      </Grid>
    </Box>
  );

  // const map: IngredientWeight = new Map();

  // TODO - необходимо учитывать вес на выходе при расчете веса продуктов

  // TODO - необходимо отдельно парсить вложенные рецепты
  // collection.recipes.forEach(({ recipe }) => {
  //   recipe.items.forEach(item => {
  //     const { ingredientType: ingType, ingredientUuid: ingUuid } = item;
  //     if (ingType === IngredientType.RECIPE) return;
  //     const ing = map.get(ingUuid);
  //     if (ing) ing.weight = ing.weight + item.amount;
  //     else map.set(ingUuid, { weight: item.amount });
  //   });
  // })
  //
  // return (
  //   <Box width={600}>
  //     <Grid container>
  //       {
  //         [...map.entries()].map(([uuid, ingredient]) => (
  //           <Fragment>
  //             <Grid size={6}>
  //               {uuid}
  //             </Grid>
  //             <Grid size={6}>
  //               {ingredient.weight}
  //             </Grid>
  //           </Fragment>
  //         ))
  //       }
  //     </Grid>
  //   </Box>
  // );
}

