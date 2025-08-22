'use client'

import Image from 'next/image';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Product } from '@/app/generated/prisma';

const columns: GridColDef<Product>[] = [
  { 
    field: 'photo',
    headerName: '',
    renderCell({ row }) {
      return (
        <Image 
          src={`/products/${row.slug}.webp`} 
          alt={row.slug} 
          width={48}
          height={48}
        />
      );
    },
  },
  { 
    field: 'name',
    headerName: 'Название',
  },
  { 
    field: 'calories',
    headerName: 'К',
  },
  { 
    field: 'protein',
    headerName: 'Б',
  },
  { 
    field: 'fat',
    headerName: 'Ж',
  },
  { 
    field: 'carbs',
    headerName: 'У',
  },
];

interface ProductsTableProps {
  rows: Product[];
}

export default function ProductsTable({ rows }: ProductsTableProps) {
  return (
    <DataGrid 
      rows={rows}
      columns={columns}
    />
  );
}
