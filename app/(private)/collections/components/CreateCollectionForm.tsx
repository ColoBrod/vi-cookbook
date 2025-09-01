'use client';

import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Dialog, DialogTitle, DialogContent, Stack, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AppEvent } from "@/constants/events";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { CollectionsCreateDto } from "@/types/dto";

interface FormValues {
  name: string;
}

const defaultValues = {
  name: '',
}

export default function() {
  const router = useRouter();
  const { control, handleSubmit } = useForm({ defaultValues });
  const [visible, setVisible] = useState(false);
  const title = 'Создать новую подборку';
  useEffect(handleMounted, []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Dialog open={visible} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ width: 300 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} pt={2}>
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
    const closeEvent = new Event(AppEvent.Collection.HideCreateForm);
    try {
      await axios.post(`/api/collections`, formValues);
      enqueueSnackbar('Добавлена новая подборка', { variant: 'success' })
      router.refresh();
    }
    catch (err) {
      const error = err as AxiosError<{ error: string; }>
      if (error.response?.data?.error) {
        enqueueSnackbar(error.response.data.error, { variant: 'error' })
      }
      else {
        enqueueSnackbar('Уууупс... Что-то пошло не так', { variant: 'error' })
      }
    }
    finally {
      document.dispatchEvent(closeEvent);
    }
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
