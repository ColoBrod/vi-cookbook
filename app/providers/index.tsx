'use client'

import { SessionProvider } from "next-auth/react"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from "./ConfirmProvider";
import { ComponentType } from "react";

interface Provider<P = any> {
  ProviderComponent: ComponentType<P>;
  props?: P;
}

const providers: Provider[] = [
  { ProviderComponent: AppRouterCacheProvider },
  { ProviderComponent: SessionProvider },
  { ProviderComponent: SnackbarProvider, props: { maxSnack: 3 } },
  { ProviderComponent: ConfirmProvider },
];

export default function Providers({ children }: React.PropsWithChildren) {
  return providers.reduceRight((acc, { ProviderComponent, props }) => (
    <ProviderComponent {...props}>{acc}</ProviderComponent>
  ), children)
}
