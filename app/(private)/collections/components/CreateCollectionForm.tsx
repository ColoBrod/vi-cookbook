'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, Stack, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AppEvent } from "@/constants/events";

interface FormValues {
  name: string;
}

const defaultValues = {
  name: '',
}

export default function() {
  const { control, handleSubmit } = useForm({ defaultValues });
  const [visible, setVisible] = useState(true);
  const title = 'Создать новую подборку';
  useEffect(handleMounted, []);

  return (
    <Dialog open={visible} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Введи название подборки" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  autoFocus
                  type='text'
                  label='Название подборки'
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Button type="submit" variant="contained">
              Сохранить
            </Button>

          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );

  async function onSubmit(formValues: FormValues): Promise<void> {
    try {
      await axios.post(`/api/collections`, formValues);
    }
    catch (e) {}
    finally {}
  }

  function handleOpen() {
    setVisible(true);
  }

  function handleClose() {
    setVisible(false);
  }

  function handleMounted() {
    document.addEventListener(AppEvent.Collection.ShowCreateForm, handleOpen);
    document.addEventListener(AppEvent.Collection.HideCreateForm, handleClose);
    return handleUnmounted;
  }

  function handleUnmounted() {
    document.removeEventListener(AppEvent.Collection.ShowCreateForm, handleOpen);
    document.removeEventListener(AppEvent.Collection.HideCreateForm, handleClose);
  }
}
