import Link from "next/link";
import { 
  Typography, Stack,
  Card, CardHeader, CardContent, CardActionArea, Avatar, AvatarGroup,
  Tooltip,
  Button
} from "@mui/material";
import { getCollections } from "@/model/collections";
import CollectionActionsButton from "./CollectionActionsButton";

type CollectionJoined = Awaited<ReturnType<typeof getCollections>>[number];

interface CollectionCardProps {
  collection: CollectionJoined;
}

export default function CollectionCard({ collection }: CollectionCardProps) {

  return (
    <Card>
      <CardActionArea
        LinkComponent={Link}
        href={`/collections/${collection.id}`}
      >
        <CardHeader 
          title={collection.name} 
          action={<CollectionActionsButton id={collection.id} />}
        />
      </CardActionArea>
      <CardContent>
        <Stack direction='row' minHeight={44} alignItems='center'>
          <AvatarGroup total={collection.recipes.length} variant="rounded" spacing='medium'>
            {
              collection.recipes.length > 0
                ? collection.recipes.slice(0, 3).map(({ recipe }) => (
                  <Tooltip title={recipe.name}>
                    <Avatar 
                      variant="rounded" 
                      src={recipe.imagePath} 
                      alt={recipe.name} 
                      component={Link}
                      href={`/recipes/${recipe.slug}`}
                    />
                  </Tooltip>
                ))
                : <Typography variant="body1" color="text.secondary">В подборке пока нет рецептов</Typography>
            }
          </AvatarGroup>
        </Stack>
        {/*
          <Button LinkComponent={Link} href={`/collections/${collection.id}`}>
            Открыть
          </Button>
        */}
      </CardContent>
    </Card>

  );
}
