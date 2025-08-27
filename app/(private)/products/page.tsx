import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import prisma from '@/lib/prisma';
import ProductsTable from './components/ProductsTable';
import Link from 'next/link';


export default async function() {
  const products = await prisma.product.findMany();

  return (
    <Box p={2} position='relative'>
      <ProductsTable rows={products} />
      <Fab 
        LinkComponent={Link}
        href="/products/add"
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
