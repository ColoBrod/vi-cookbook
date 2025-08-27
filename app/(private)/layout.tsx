import { Box } from '@mui/material'
import TopPanel from "@/app/components/TopPanel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
// import { SessionProvider } from "next-auth/react";

export default async function({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <Box height='100dvh' display='flex' flexDirection='column'>
      <TopPanel />
      <Box flexGrow={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
}
