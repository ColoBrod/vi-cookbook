'use client'

import { Fab } from "@mui/material";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import { MouseEventHandler } from "react";

interface FabAddProps {
  href?: string;
  event?: string;
  // onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function FabAdd({ href, event }: FabAddProps) {
  const props = href
    ? { href }
    : event
    ? { onClick: () => document.dispatchEvent(new Event(event)) }
    : {};
  return (
    <Fab 
      {...props}
      LinkComponent={Link}
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
