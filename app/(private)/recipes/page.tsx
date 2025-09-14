import { Box, Grid, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import prisma from "@/lib/prisma";
import Link from "next/link";
import RecipeCard from "./components/RecipeCard";
import RecipesFilterBar from "./components/RecipesFilterBar";
import AddToCollectionForm from "./components/AddToCollectionForm";
import RecipesPagination from "./components/RecipesPagination";
import { MyPagination } from "@/types/general";
import { type Prisma } from '@/app/generated/prisma';

interface PageProps {
  searchParams: Promise<{
    query: string;
    tags: string;
    author: string;
    page: string;
  }>;
}

const ITEMS_PER_PAGE = 12;

export default async function({ searchParams }: PageProps) {

  const filters = await getFilters();
  const where = getWhereClause(filters);
  const pagination = await getPagination(where);
  const recipes = await prisma.recipe.findMany({
    where,
    skip: pagination.skip,
    take: pagination.take,
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

      <RecipesPagination pagination={pagination} />

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
      <AddToCollectionForm />
    </Box>
  );

  async function getPagination(where: Prisma.RecipeWhereInput): Promise<MyPagination> {
    const pageParam = (await searchParams).page ?? "1"; //.get('page') ?? "1";
    const pageInt = parseInt(pageParam);
    const page = isNaN(pageInt) ? 1 : pageInt;
    const total = await prisma.recipe.count({ where });
    const take = ITEMS_PER_PAGE;
    const pages = Math.ceil(total / take);
    const skip = (page - 1) * take;
    return { page, pages, total, skip, take };
  }

  async function getFilters() {
    const filters = await searchParams;
    const tags = filters?.tags?.split(',').map(tag => parseInt(tag)) ?? [];
    const query = filters?.query ?? "";
    const author = isNaN(parseInt(filters?.author)) ? 0 : parseInt(filters?.author);
    return { tags, query, author };
  }

  function getWhereClause(filters: Awaited<ReturnType<typeof getFilters>>): Prisma.RecipeWhereInput {
    return ({
      AND: [
        filters.query 
          ? { name: { contains: filters.query } } 
          : {},
        filters.tags.length > 0
          ? { tags: { some: { id: { in: filters.tags }} } }
          : {},
        filters.author
          ? { author: { id: filters.author } }
          : {},
      ]
    });
  }


}
