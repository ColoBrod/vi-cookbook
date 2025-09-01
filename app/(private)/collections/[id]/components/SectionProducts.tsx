import { Fragment } from "react";
import { Paper, Box, Grid, Typography, Divider, Stack } from "@mui/material";
import { getCollectionProductsWeight } from "@/model/collections"
import { unitMap } from "@/constants/units";
import { Unit } from "@/app/generated/prisma";

interface SectionProductsProps {
  products: Awaited<ReturnType<typeof getCollectionProductsWeight>>;
}

export default function SectionProducts({ products }: SectionProductsProps) {
  const totalWeight = getTotalWeight();

  return (
    <Paper>
      <Stack p={2} spacing={1}>
        <Typography variant="h5">
          Список продуктов
        </Typography>
        <Divider />
        <Grid container>
          {products.map(product => (
            <Fragment key={product.uuid}>
              <Grid size={9}>
                <Typography variant="body1">
                  {product.name}
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography variant="body1" textAlign='right'>
                  {product.weight.toFixed(2)} {unitMap.get(Unit.G)}
                </Typography>
              </Grid>
            </Fragment>
          ))}
          <Grid size={12} my={1}>
            <Divider />
          </Grid>
          <Grid size={9}>
            <Typography variant="body1" fontWeight='bold'>
              Общий вес
            </Typography>
          </Grid>
          <Grid size={3}>
            <Typography variant="body1" textAlign='right' fontWeight='bold'>
              {totalWeight.toFixed(2)} {unitMap.get(Unit.G)}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Paper>
  );

  function getTotalWeight() {
    return products.reduce((acc, cur) => acc + cur.weight, 0);
  }

}
