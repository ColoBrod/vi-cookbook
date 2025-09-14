'use client'

import { Fragment, useEffect, useRef } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AppEvent, EventPayloadShowAddToCollectionForm } from "@/constants/events";
import { useConfirm } from "@/app/providers/ConfirmProvider";
import { useHttpRequest } from "@/hooks/useHttpRequest";

interface Props {
  id: number;
  slug: string;
}

export default function RecipeActionsButton({ id, slug }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const confirm = useConfirm();
  const makeRequest = useHttpRequest();
  const menuRef = useRef(null)

  return (
    <Fragment>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        ref={menuRef}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // onClick={(e) => e.stopPropagation()} // чтобы меню кликом не открывало карточку
        onSelect={() => handleClose()}
      >
        <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
        <MenuItem onClick={handleDelete}>Удалить</MenuItem>
        <MenuItem onClick={handleAddToCollection}>Добавить в подборку</MenuItem>
      </Menu>
    </Fragment>
  );

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function handleEdit() {
    router.push(`/recipes/edit/${slug}`);
  }

  async function handleDelete() {
    handleClose();
    const ok = await confirm({
      title: "Удаление рецепта",
      description: "Ты уверен(а), что хочешь удалить этот рецепт?",
      confirmText: "Удалить",
      cancelText: "Отмена",
    });
    if (ok === false) return;
    makeRequest({
      url: `/api/recipes/${id}`,
      config: { method: 'delete' },
      notification: {
        success: 'Рецепт удален'
      },
      callback: {
        onTry: () => router.refresh(),
      },
    });
  }

  async function handleAddToCollection() {
    const event = new CustomEvent<EventPayloadShowAddToCollectionForm>(
      AppEvent.Collection.ShowAddToCollectionForm, 
      { detail: { recipeId: id } }
    );
    document.dispatchEvent(event);
    handleClose();
  }
}

