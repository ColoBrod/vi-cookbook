'use client'

import { IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { AppEvent } from "@/constants/events";

export default function SideMenuButton() {
  return (
    <IconButton 
      onClick={() => {
        const event = new Event(AppEvent.SideMenu.Open)
        document.dispatchEvent(event);
      }}
      sx={{ color: (theme) => theme.palette.getContrastText(theme.palette.primary.main) }}
    >
      <MenuIcon />
    </IconButton>
  );
}

