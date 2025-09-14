'use client'

import { DataGrid, GridCallbackDetails, GridPaginationModel } from '@mui/x-data-grid';
import { Product } from '@/app/generated/prisma';
import { columns } from './columns';
import { MyPagination } from '@/types/general';
import { gridToPrismaPaginationModel, myToGridPaginationModel } from '@/lib/table/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';

interface ProductsTableProps {
  rows: Product[];
  pagination: MyPagination;
}

export default function ProductsTable({ rows, pagination }: ProductsTableProps) {

  const router = useRouter();
  const searchParams = useSearchParams();
  const paginationModel = myToGridPaginationModel(pagination);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <DataGrid 
      rows={rows}
      columns={columns}
      disableRowSelectionOnClick
      paginationMode='server'
      paginationModel={paginationModel}
      rowCount={pagination.total}
      pageSizeOptions={[10, 20, 50]}
      onPaginationModelChange={handlePaginationModelChange}
      processRowUpdate={processRowUpdate}
    />
  );

  async function processRowUpdate(newRow: Product, oldRow: Product): Promise<Product> {

    const delta = getDelta(newRow, oldRow);

    try {
      const { data } = await axios.patch<Product, AxiosResponse<Product>, Product>(`/api/products/${oldRow.id}`, delta);
      return data;
    }
    catch (e) {
      const error = e as AxiosError<{ error: string; }>
      if (error.response?.data?.error) enqueueSnackbar(
        error.response.data.error, { variant: 'error' }
      );
      else enqueueSnackbar(
        'Уууупс... Что-то пошло не так', { variant: 'error' }
      );
      return oldRow;
    }

    function getDelta<T extends object>(newRow: T, oldRow: T) {
      const delta: Partial<T> = {};
      for (const key in newRow) {
        if (newRow[key] !== oldRow[key]) {
          delta[key] = newRow[key];
        }
      }
      return delta;
    }
  }

  function handlePaginationModelChange(
    model: GridPaginationModel,
    details: GridCallbackDetails<'pagination'>
  ): void {
    if (details.reason !== 'setPaginationModel') return;
    const { page, take } = gridToPrismaPaginationModel(model);
    // setParams({ page, take })
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    params.set('take', take.toString());
    router.push(`?${params.toString()}`);
  }

  async function getFilters() {
    // const filters = await searchParams;
  }
}
