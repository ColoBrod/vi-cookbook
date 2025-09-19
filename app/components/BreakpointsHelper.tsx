'use client'

/**
 * Используется исключительно в dev mode для отладки адаптивности приложения
 */

import { Typography } from "@mui/material"
import { useWidth } from "@/hooks/useWidth";

export default function BreakpointsHelper() {
  const size = useWidth();

  return (
    <Typography variant="body1">
      {size.toUpperCase()}
    </Typography>
  );

}
