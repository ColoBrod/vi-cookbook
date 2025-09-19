'use client'

import { SessionProvider } from "next-auth/react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from "./ConfirmProvider";
import { ComponentType } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface Provider<P = any> {
  ProviderComponent: ComponentType<P>;
  props?: P;
}

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const providers: Provider[] = [
  { ProviderComponent: AppRouterCacheProvider },
  { ProviderComponent: SessionProvider },
  { ProviderComponent: ThemeProvider, props: { theme } },
  { ProviderComponent: SnackbarProvider, props: { maxSnack: 3 } },
  { ProviderComponent: ConfirmProvider },
];

export default function Providers({ children }: React.PropsWithChildren) {
  return providers.reduceRight((acc, { ProviderComponent, props }) => (
    <ProviderComponent {...props}>
      {acc}
      {ProviderComponent === ThemeProvider && <CssBaseline />}
    </ProviderComponent>
  ), children)
}
