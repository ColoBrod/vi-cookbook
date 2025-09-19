import {
  GridToolbarProps,
  ToolbarPropsOverrides,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
// import { ButtonResetSettings } from './ButtonResetSettings';
// import { ButtonToggleDataView } from '@components/ButtonToggleDataView';

export const CustomTableToolbar: React.FC<
  GridToolbarProps & ToolbarPropsOverrides
> = () => {

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton slotProps={{}} />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      {/* <ButtonResetSettings /> */}
      {/* <ButtonToggleDataView /> */}
    </GridToolbarContainer>
  );
};



