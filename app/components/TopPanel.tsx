'use client'

import { Fragment } from "react";
import { AppBar, Toolbar, Button, Typography, Stack, Box } from "@mui/material";
import Link from "next/link";
import { AppLink } from "@/types/links";
import GoBackButton from "./GoBackButton";
import UserButton from "./UserButton";
import { pages } from "@/constants/navigation";
import BreakpointsHelper from "./BreakpointsHelper";
import { appEnv } from "@/lib/environment";
import SideMenuButton from "./SideMenuButton";
import { useWidth } from "@/hooks/useWidth";

export default function TopPanel() {
  const size = useWidth();
  const isMobile = size === 'xs';
  const isDesktop = size !== 'xs';

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && <SideMenuButton />}
        {isDesktop && <GoBackButton />}
        {isDesktop && [...pages.entries()].map(([href, name]) => (
          <Button key={href} color="inherit" component={Link} href={href}>
            {name}
          </Button>
        ))}
        <Box display='flex' justifyContent='flex-end' sx={{ flexGrow: 1 }}>
          {/* <BreakpointsHelper /> */}
          <UserButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

