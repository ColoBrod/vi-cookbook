import { Box, Grid, Card, Avatar, CardHeader, IconButton, CardMedia, CardContent, Fab, CardActionArea } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import prisma from "@/lib/prisma";
import Link from "next/link";
import RecipeActionsButton from "./components/RecipeActionsButton";

export default async function() {
  const recipes = await prisma.recipe.findMany();

  return (
    <Box p={2} position='relative'>
      <Grid container spacing={2}>
        {
          recipes.map(recipe => (
            <Grid 
              key={recipe.id}
              size={{
                xl: 3,
                lg: 4,
                md: 6,
                sm: 6,
                xs: 12,
              }}
            >
              <Card>
                <CardHeader
                  avatar={
                    <Avatar src='/avatars/vi' aria-label="recipe">
                      Vi
                    </Avatar>
                  }
                  action={<RecipeActionsButton id={recipe.id} /> }
                  title={recipe.name}
                  subheader={(new Date()).toLocaleDateString('ru')}
                />
                <CardActionArea LinkComponent={Link} href={`/recipes/${recipe.id}`}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={`/recipes/${recipe.slug}.jpg`}
                    alt={recipe.name}
                  />
                </CardActionArea>
                <CardContent>
                  Здесь охренеть какое большое описание рецепта, бла-бла-бла. Здесь охренеть какое большое описание рецепта, бла-бла-бла..
                </CardContent>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <Fab 
        LinkComponent={Link}
        href="/recipes/add"
        sx={{
          position: 'fixed',
          right: 16, bottom: 16
        }}
        color="primary" 
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
