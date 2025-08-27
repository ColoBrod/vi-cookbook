'use client'

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
}

export default function RecipeActionsButton({ id }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  return (
    <>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()} // чтобы меню кликом не открывало карточку
      >
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </>
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleEdit() {
    router.push(`/recipes/edit/${id}`);
  }

  async function handleDelete() {
    try {
      await axios.delete(`/api/recipes/${id}`);
      router.refresh();
    }
    catch (e) {

    }
    finally {
      handleClose();
    }
  }
}

