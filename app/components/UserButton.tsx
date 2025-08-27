'use client'

import { Fragment, useState } from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserButton() {
  const { data: session, status } = useSession();

  // console.log(`%cStatus: ${status}`, 'color: blue; font-size: 20px;')

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (status === 'loading') return null;

  const { user } = session!;

  return (
    <Fragment>
      <IconButton
        // size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar alt={user!.name!} src={`/avatars/${user!.name!}.jpg`} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenProfile}>Мой профиль</MenuItem>
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </Fragment>
  );

  function handleMenu(event: React.MouseEvent<HTMLElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleOpenProfile(): void {
    router.push('/profile');
    setAnchorEl(null);
  }

  function handleLogout(): void {
    signOut({ redirect: true, callbackUrl: '/login' })
    setAnchorEl(null);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }
}
