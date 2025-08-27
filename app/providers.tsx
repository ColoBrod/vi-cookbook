'use client'

import { SessionProvider } from "next-auth/react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <SessionProvider>
        {children}
      </SessionProvider>
    </AppRouterCacheProvider>
  );
}
