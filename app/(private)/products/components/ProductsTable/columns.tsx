import { Product } from '@/app/generated/prisma';
import { GridColDef } from "@mui/x-data-grid";
import RowButtons from './RowButtons';

export const columns: GridColDef<Product>[] = [
  { 
    field: 'name',
    headerName: 'Название',
    width: 150,
    editable: true,
    type: 'string',
    // valueSetter(value, row) {
    //   // return value
    // },
  },
  { 
    field: 'calories',
    headerName: 'К',
    width: 60,
    editable: true,
    type: 'number',
  },
  { 
    field: 'protein',
    headerName: 'Б',
    width: 60,
    editable: true,
    type: 'number',
  },
  { 
    field: 'fat',
    headerName: 'Ж',
    width: 60,
    editable: true,
    type: 'number',
  },
  { 
    field: 'carbs',
    headerName: 'У',
    width: 60,
    editable: true,
    type: 'number',
  },
  {
    field: 'buttons',
    headerName: '',
    // width: 150,
    minWidth: 150,
    maxWidth: 150,
    type: 'actions',
    renderCell({ row }) {
      return <RowButtons product={row} />
    },
  }
  // {
  //   field: 'buttons',
  //   renderCell: ({ row }) => (<Row product={row} />),
  // },
];
