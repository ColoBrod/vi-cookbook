'use client';

import { Typography, useTheme } from "@mui/material";

interface DescriptionProps {
  content: string | null;
}

export default function Description({ content }: DescriptionProps) {
  const theme = useTheme();
  const height = 72;

  if (content === null) return (
    <Typography 
      color={theme.palette.grey[500]}
      textAlign='center'
      alignContent='center'
      height={height}
    >
      Описание отсутствует
    </Typography>
  )
  return (
    <Typography
      sx={{
        height,
        display: '-webkit-box',
        WebkitLineClamp: 3, // ограничиваем до 3 строк
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {content}
    </Typography>
  );
}
