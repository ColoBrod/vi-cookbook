import { Box } from '@mui/material';

import { getCategoryTree } from '@/model/categories';

export default async function() {
  // const categories = await prisma.category.findMany();
  // console.log(categories);
  const categoryTree = await getCategoryTree();
  console.log(categoryTree);
  // console.dir(categoryTree);

  return (
    <Box>

    </Box>
  );

}
