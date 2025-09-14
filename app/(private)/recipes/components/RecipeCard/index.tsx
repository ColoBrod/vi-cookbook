
import { 
  Card, Avatar, CardHeader, CardMedia, CardContent, CardActionArea, Stack 
} from '@mui/material';
import RecipeActionsButton from "../RecipeActionsButton";
import Link from "next/link";
import { Recipe, Tag, User } from "@/app/generated/prisma";
import { getRecipeImagePath } from '@/lib/recipe';
import Description from './Description';
import Tags from './Tags';
import IconBar from './IconBar';

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
            {recipe.author.name} 
          </Avatar>
        }
        action={<RecipeActionsButton id={recipe.id} slug={recipe.slug} /> }
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
          <Description content={recipe.description} />
          <Tags items={recipe.tags} />
          <IconBar />
        </Stack>
      </CardContent>

    </Card>
  );
}
