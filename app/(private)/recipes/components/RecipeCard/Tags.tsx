import { Tag } from "@/app/generated/prisma"
import { Stack } from "@mui/material";
import RecipeTag from "../RecipeTag";

interface TagsProps {
  items: Tag[];
}

export default function Tags({ items }: TagsProps) {
  return (
    <Stack direction='row' spacing={1}>
      {items.map(tag => (
        <RecipeTag key={tag.id} {...tag} />
      ))}
    </Stack>
  );
}
