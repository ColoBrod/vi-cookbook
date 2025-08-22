'use client';

import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <IconButton 
      onClick={() => router.back()}
      sx={{ color: (theme) => theme.palette.getContrastText(theme.palette.primary.main) }}
    >
      <ArrowBackIcon fontSize="small" />
    </IconButton>
  );
}
