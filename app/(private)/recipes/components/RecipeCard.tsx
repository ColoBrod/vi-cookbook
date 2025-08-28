
import { Card, Avatar, CardHeader, CardMedia, CardContent, CardActionArea, Stack, Typography } from '@mui/material';
import RecipeActionsButton from "./RecipeActionsButton";
import Link from "next/link";
import { Recipe, Tag, User } from "@/app/generated/prisma";
import { getRecipeImagePath } from '@/lib/recipe';
import RecipeTag from './RecipeTag';

interface RecipeWithAuthorAndTags extends Recipe {
  author: User;
  tags: Tag[];
}

interface RecipeCardProps {
  recipe: RecipeWithAuthorAndTags;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const imagePath = getRecipeImagePath(recipe.slug);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={`/avatars/${recipe.author.name}.jpg`} aria-label="recipe">
            Vi 
          </Avatar>
        }
        action={<RecipeActionsButton slug={recipe.slug} /> }
        title={recipe.name}
        subheader={(new Date()).toLocaleDateString('ru')}
      />
      <CardActionArea LinkComponent={Link} href={`/recipes/${recipe.slug}`}>
        <CardMedia
          component="img"
          height="194"
          image={imagePath}
          alt={recipe.name}
        />
      </CardActionArea>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant='body1'>
            Здесь охренеть какое большое описание рецепта, бла-бла-бла. Здесь охренеть какое большое описание рецепта, бла-бла-бла..
          </Typography>
          <Stack direction='row' spacing={1}>
            {recipe.tags.map(tag => (
              <RecipeTag key={tag.id} {...tag} />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
