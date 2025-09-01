'use client'

import { SessionProvider } from "next-auth/react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SnackbarProvider } from 'notistack';

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        <SnackbarProvider maxSnack={3}>
          {children}
        </SnackbarProvider>
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}
