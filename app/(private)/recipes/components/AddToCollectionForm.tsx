'use client'

import { useEffect, useState } from "react";
import { AppEvent } from "@/constants/events";
import { Collection, CollectionRecipe } from "@/app/generated/prisma";
import { Dialog, DialogTitle, DialogContent, Stack, Button, TextField, Autocomplete } from '@mui/material'
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { EventPayloadShowAddToCollectionForm } from "@/constants/events";
import { CollectionAddRecipeDto } from "@/types/dto";

interface FormValues {
  recipeId: number;
  collectionId: number;
  weight: number;
}

const defaultValues: FormValues = {
  recipeId: 0,
  collectionId: 0,
  weight: 0,
};

export default function AddToCollectionForm() {
  const [visible, setVisible] = useState(false);
  const [collections, setCollections] = useState<Collection[]>([]);
  const { control, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues });

  useEffect(handleMounted, []);

  return (
    <Dialog open={visible} onClose={handleClose}>
      <DialogTitle>Добавить рецепт в подборку</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} pt={2}>
            <Controller
              name='collectionId'
              control={control}
              rules={{ required: 'Выбери подборку' }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  options={collections}
                  getOptionKey={option => option.id}
                  getOptionLabel={option => option.name}
                  onChange={(_, val) => {
                    field.onChange(val?.id ?? "");
                  }}
                  value={collections.find((col) => col.id === field.value) ?? null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Подборка"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="weight"
              control={control}
              rules={{ required: 'Укажи выход рецепта' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Выход (г)"
                  inputProps={{ step: 0.01 }}
                  onChange={e => field.onChange(Number(e.target.value))}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
            <Button type="submit" variant="contained">
              Добавить рецепт
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );

  async function onSubmit(formValues: FormValues) {
    try {
      const collectionRecipe = await axios.post<
        CollectionRecipe, AxiosResponse<CollectionRecipe>, CollectionAddRecipeDto
      >(
        `/api/collections/${formValues.collectionId}/add-recipe`, 
        { recipeId: formValues.recipeId, weight: formValues.weight }
      );
    }
    catch (e) {

    }
    finally {
      handleClose();
    }
  }

  async function handleOpen(event: CustomEventInit<EventPayloadShowAddToCollectionForm>) {
    const recipeId = event.detail?.recipeId;
    if (recipeId === undefined) return;
    const [{ data: collections }, { data: { weight }}] = await Promise.all([
      axios.get<Collection[]>('/api/collections'),
      axios.get<{ weight: number }>(`/api/recipes/${recipeId}/weight`),
    ]);
    setValue('recipeId', recipeId);
    setValue('weight', weight);
    setCollections(collections);
    setVisible(true);
  }

  function handleClose() {
    setVisible(false);
  }

  function handleMounted() {
    document.addEventListener(AppEvent.Collection.ShowAddToCollectionForm, handleOpen);
    document.addEventListener(AppEvent.Collection.HideAddToCollectionForm, handleClose);
    return handleUnmounted;
    // axios.get<Collection[]>('/api/collections')
    //   .then(({ data }) => setCollections(data));
  }

  function handleUnmounted() {
    document.removeEventListener(AppEvent.Collection.ShowAddToCollectionForm, handleOpen);
    document.removeEventListener(AppEvent.Collection.HideAddToCollectionForm, handleClose);
  }
}
