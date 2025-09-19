'use client'

import { useEffect, useState } from 'react';

import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { AppEvent } from '@/constants/events';
import { pages } from "@/constants/navigation";
import Link from 'next/link';

import LunchDiningIcon from '@mui/icons-material/LunchDining';
import GrassIcon from '@mui/icons-material/Grass';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { AppLink } from '@/types/links';

const hrefToIcon = new Map<AppLink, React.ReactElement>([
  [AppLink.Recipes, <LunchDiningIcon />],
  [AppLink.Products, <GrassIcon />],
  [AppLink.Categories, <FormatListBulletedIcon />],
  [AppLink.Collections, <FormatListBulletedIcon />],
])

export default function SideMenu() {

  const [open, setOpen] = useState(false);
  useEffect(handleMounted, []);

  return (
    <Drawer open={open} onClose={handleClose}>
      <Box width={250} role="presentation" onClick={handleClose}>
        <List>
          {[...pages.entries()].map(([href, name]) => (
            <ListItem key={href} disablePadding>
              <ListItemButton LinkComponent={Link} href={href}>
                <ListItemIcon>
                  {hrefToIcon.get(href) ?? null}
                </ListItemIcon>
                <ListItemText primary={name} />
                {/* <ListItemIcon> */}
                {/*   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                {/* </ListItemIcon> */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  function handleMounted() {
    document.addEventListener(AppEvent.SideMenu.Open, handleOpen);
    document.addEventListener(AppEvent.SideMenu.Close, handleClose);
    document.addEventListener(AppEvent.SideMenu.Toggle, handleToggle);
    return handleUnmounted;
  }

  function handleUnmounted() {
    document.removeEventListener(AppEvent.SideMenu.Open, handleOpen);
    document.removeEventListener(AppEvent.SideMenu.Close, handleClose);
    document.removeEventListener(AppEvent.SideMenu.Toggle, handleToggle);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleToggle() {
    setOpen(prev => !prev);
  }

}

