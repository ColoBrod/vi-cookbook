import { AppBar, Toolbar, Button, Typography, Stack } from "@mui/material";
import Link from "next/link";
import { AppLink } from "@/types/links";
import GoBackButton from "./GoBackButton";

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
        <Button color="inherit" component={Link} href={AppLink.Categories}>
          Категории
        </Button>
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

