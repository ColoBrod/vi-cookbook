'use client'

import { Chip } from "@mui/material";
import { Tag } from "@/app/generated/prisma"
import { useRouter, useSearchParams } from "next/navigation";

export default function RecipeTag({ id, name }: Tag) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Chip 
      key={id} 
      label={name} 
      variant='outlined' 
      clickable  
      onClick={handleClick}
    />
  );

  function handleClick() {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tags', id.toString());
    router.push(`?${params.toString()}`);
  }
}

