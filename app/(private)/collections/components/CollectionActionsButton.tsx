'use client'

import { Fragment, MouseEvent, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
}

export default function CollectionActionsButton({ id }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  return (
    <Fragment>
      <IconButton onMouseDown={e => e.stopPropagation()} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()} // чтобы меню кликом не открывало карточку
      >
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
      </Menu>
    </Fragment>
  );

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
    event.preventDefault();
  }

  async function handleDelete() {
    try {
      await axios.delete(`/api/collections/${id}`);
      router.refresh();
    }
    catch (e) {

    }
    finally {
      handleClose();
    }
  }
}

