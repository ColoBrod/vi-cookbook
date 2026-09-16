import { Product } from '@/app/generated/prisma';
import { GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import RowButtons from './RowButtons';
import { Tooltip } from '@mui/material';

export const columns: GridColDef<Product>[] = [
  { 
    field: 'name',
    headerName: 'Название',
    width: 150,
    editable: true,
    type: 'string',
  },
  { 
    field: 'calories',
    headerName: 'Калории',
    renderHeader,
    // renderHeader: ({ colDef }) => (
    //   <Tooltip title={colDef.headerName}>
    //     <span>{colDef.headerName?.[0]}</span>
    //   </Tooltip>
    // ),
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
  // { 
  //   field: 'fiber',
  //   headerName: 'кл.',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'sugar',
  //   headerName: 'Сахар',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'mineralNa',
  //   headerName: 'Na',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'mineralK',
  //   headerName: 'K',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'mineralCa',
  //   headerName: 'Ca',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'mineralFe',
  //   headerName: 'Fe',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'mineralMg',
  //   headerName: 'Mg',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'mineralZn',
  //   headerName: 'Zn',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'mineralP',
  //   headerName: 'P',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'mineralSe',
  //   headerName: 'Se',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminA',
  //   headerName: 'A',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminC',
  //   headerName: 'C',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminD',
  //   headerName: 'D',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminE',
  //   headerName: 'E',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminK',
  //   headerName: 'K',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminB1',
  //   headerName: 'B1',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminB2',
  //   headerName: 'B2',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminB3',
  //   headerName: 'B3',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminB6',
  //   headerName: 'B6',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminB9',
  //   headerName: 'B9',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'vitaminB12',
  //   headerName: 'B12',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
  // { 
  //   field: 'glycemicIndex',
  //   headerName: 'GI',
  //   width: 60,
  //   editable: true,
  //   type: 'number',
  // },
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

function renderHeader(params: GridColumnHeaderParams<Product, any, any>) {
  const { colDef: { headerName } } = params;
  return (
    <Tooltip title={headerName}>
      <span>{headerName?.[0] ?? ""}</span>
    </Tooltip>
  )


}
