import { Box, Grid, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import prisma from "@/lib/prisma";
import Link from "next/link";
import RecipeCard from "./components/RecipeCard";
import RecipesFilterBar from "./components/RecipesFilterBar";
import { PrismaClient } from "@/app/generated/prisma";
import { Prisma } from '@/app/generated/prisma';

type GetWherePayload<T extends Record<any, any>, M extends keyof any> =
  Exclude<Prisma.Args<T[M], 'findFirstOrThrow'>['where'], undefined>

type RecipeWhereInput = GetWherePayload<typeof prisma, 'recipe'>

// PrismaClient.RecipeWhereInput

// import RecipeWhereInput
// Prisma.RecipeWhereInput

interface PageProps {
  searchParams: Promise<{
    query: string;
    tags: string;
    author: string;
  }>;
}

export default async function({ searchParams }: PageProps) {
  const filters = await getFilters();
  const where = getWhereClause();
  const recipes = await prisma.recipe.findMany({
    where,
    // where: {
    //   AND: [
    //     { name: { search } }
    //   ]
    // }
    // where: 
    // where: filters.tags.length > 0
    //   ? {
    //       tags: {
    //         some: { id: { in: filters.tags }}
    //       },
    //     }
    //   : {},
    include: { author: true, tags: true }
  });
  const tagsAvailable = await prisma.tag.findMany({ where: { isRecipe: true } });
  const authors = await prisma.user.findMany();

  return (
    <Box p={2} position='relative'>
      <RecipesFilterBar 
        authors={authors}
        tagsAvailable={tagsAvailable}
      />
      <Grid container spacing={2}>
        {recipes.map(recipe => (
          <Grid 
            key={recipe.uuid}
            size={{ xl: 3, lg: 4, md: 6, sm: 6, xs: 12 }}
          >
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
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

  function getWhereClause(): RecipeWhereInput {
    const where: RecipeWhereInput = {
      AND: [
        filters.query && {
          name: { search: filters.query },
        },
        filters.tags.length > 0 && {
          tags: {
            some: { id: { in: filters.tags } },
          },
        },
        filters.author && {
          author: filters.author,
        },
        // можно добавлять другие фильтры
      ].filter(Boolean), // убираем все false/null
    };

    // Если AND пустой — убираем его, чтобы Prisma вернула всё
    if (where.AND.length === 0) delete where.AND;
    return where;

  }

  async function getFilters() {
    const filters = await searchParams;
    const tags = filters?.tags?.split(',').map(tag => parseInt(tag)) ?? [];
    const query = filters?.query ?? "";
    const author = filters?.author ?? 0;
    return { tags, query, author };
  }

}
