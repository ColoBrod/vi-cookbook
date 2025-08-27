'use client'

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function SignOutButton() {

  return (
    <Button 
      color="inherit"
      onClick={() => {
        signOut({ redirect: true, callbackUrl: '/login' })
      }}
    >
      Logout
    </Button>
  );
}
