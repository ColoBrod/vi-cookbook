import { SxProps, Theme } from "@mui/material";

export const hiddenScrollbarProps: SxProps<Theme> = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
}
