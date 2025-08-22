import { Box } from '@mui/material'
import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import './globals.css';
import TopPanel from "./components/TopPanel";

export const metadata: Metadata = {
  title: "CookBook for Vi",
  description: "CookBook for Vi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Box height='100dvh' display='flex' flexDirection='column'>
            <TopPanel />
            <Box flexGrow={1} overflow='auto'>
              {children}
            </Box>
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
