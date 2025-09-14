import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import prisma from '@/lib/prisma';
import ProductsTable from './components/ProductsTable';
import Link from 'next/link';
import { MyPagination } from '@/types/general';
import type { SearchParams } from 'nuqs/server';
import { loadSearchParams } from './searchParams';
import { type Prisma } from '@/app/generated/prisma';

interface PageProps {
  searchParams: Promise<SearchParams>;
}


export default async function({ searchParams }: PageProps) {

  const sp = await loadSearchParams(searchParams);

  const pagination = await getPagination();

  // let orderBy: Prisma.ProductOrderByWithRelationInput;

  const products = await prisma.product.findMany({
    skip: pagination.skip,
    take: pagination.take,
    // orderBy:
  });

  return (
    <Box p={2} position='relative'>
      <ProductsTable rows={products} pagination={pagination} />
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

  async function getPagination(): Promise<MyPagination> {
    const { page, take } = sp;
    const total = await prisma.product.count();
    const pages = Math.ceil(total / take);
    const skip = (page - 1) * take;
    return { page, pages, total, skip, take }
  }

  function getOrderBy(): Prisma.ProductOrderByWithRelationInput {
    const { orderBy } = sp;
    if (orderBy === null) return {};
    const [result, key, direction] = orderBy.match(/(.*):(asc|desc)/) ?? [];
    if (result === undefined) return {};
    return { [key]: direction }
  }

  // async function getPagination(): Promise<MyPagination> {
  //   const params = await searchParams;
  //   const pageParam = params.page ?? "1";
  //   const takeParam = params.take ?? "10";
  //   const pageInt = parseInt(pageParam);
  //   const page = isNaN(pageInt) ? 1 : pageInt;
  //   const takeInt = parseInt(takeParam);
  //   const take = isNaN(takeInt) ? 10 : takeInt;
  //   // TODO - ITEMS_PER_PAGE
  //   // const take = ITEMS_PER_PAGE;
  //   const total = await prisma.product.count();
  //   const pages = Math.ceil(total / take);
  //   const skip = (page - 1) * take;
  //   return { page, pages, total, skip, take };
  // }

}
