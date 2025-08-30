import { AppBar, Toolbar, Button, Typography, Stack, Box } from "@mui/material";
import Link from "next/link";
import { AppLink } from "@/types/links";
import GoBackButton from "./GoBackButton";
import SignOutButton from "./SignOutButton";
import UserButton from "./UserButton";

export default function TopPanel() {
  return (
    <AppBar position="static">
      <Toolbar>
        <GoBackButton />
        <Button color="inherit" component={Link} href={AppLink.Products}>
          Продукты
        </Button>
        <Button color="inherit" component={Link} href={AppLink.Recipes}>
          Рецепты
        </Button>
        <Button color="inherit" component={Link} href={AppLink.Collections}>
          Подборки
        </Button>
        <Button color="inherit" component={Link} href={AppLink.Categories}>
          Категории
        </Button>
        {/*<SignOutButton />*/}
        <Box display='flex' justifyContent='flex-end' sx={{ flexGrow: 1 }}>
          <UserButton />
        </Box>

      </Toolbar>
      {/*
      <Stack direction='row' spacing={1}>
        <Typography>
          <Link href={AppLink.Products}>Продукты</Link>
        </Typography>
        <Typography>
          <Link href={AppLink.Recipes}>Рецепты</Link>
        </Typography>
        <Typography>
          <Link href={AppLink.Categories}>Категории</Link>
        </Typography>
      </Stack>
      */}
    </AppBar>
  );
}

