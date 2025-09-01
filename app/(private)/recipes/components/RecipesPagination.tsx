'use client';

import { MyPagination } from "@/types/general";
import { Box, Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

interface RecipesPaginationProps {
  pagination: MyPagination;
}

export default function RecipesPagination({ pagination }: RecipesPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { page, pages } = pagination;

  return (
    <Box p={2} display='flex' justifyContent='center'>
      <Pagination 
        page={page}
        count={pages}
        onChange={handlePageSet} 
        showFirstButton 
        showLastButton  
      />
    </Box>
  );

  function handlePageSet(event: React.ChangeEvent<unknown>, value: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', value.toString());
    router.push(`?${params.toString()}`);
  }
}
