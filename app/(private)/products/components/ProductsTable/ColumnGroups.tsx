import { Stack, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function ColumnGroups() {
  return (
    <FormGroup>
      <FormControlLabel label="КБЖУ" control={<Checkbox />} />
      <FormControlLabel label="Сах, Кл, ГИ" control={<Checkbox />} />
      <FormControlLabel label="Омега" control={<Checkbox />} />
      <FormControlLabel label="Минералы" control={<Checkbox />} />
      <FormControlLabel label="Витамины" control={<Checkbox />} />
      <FormControlLabel label="Аминокислоты" control={<Checkbox />} />
    </FormGroup>
  );
}


