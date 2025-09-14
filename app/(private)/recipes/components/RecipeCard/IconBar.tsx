import { IconButton, Stack } from "@mui/material";

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export default function IconBar() {
  return (
    <Stack direction='row' spacing={1}>
      <IconButton>
        <FavoriteBorderOutlinedIcon />
      </IconButton>
      <IconButton>
        <ShareOutlinedIcon />
      </IconButton>
      <IconButton>
        <AddShoppingCartOutlinedIcon />
      </IconButton>
    </Stack>
  );
}
