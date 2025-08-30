import { Fab } from "@mui/material";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';

interface FabAddProps {
  href: string;
}

export default function FabAdd({ href }: FabAddProps) {
  return (
    <Fab 
      LinkComponent={Link}
      href={href}
      sx={{
        position: 'fixed',
        right: 16, bottom: 16
      }}
      color="primary" 
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  );
}
