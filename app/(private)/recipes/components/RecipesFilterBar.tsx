'use client';

import { useEffect } from "react";
import { useTheme, Stack, TextField, Button, IconButton, InputAdornment, InputLabel, Select, MenuItem } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useForm, Controller } from "react-hook-form";
import { Tag, User } from "@/app/generated/prisma";
import { Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface FormValues {
  query: string;
  tags: number[];
  author: number;
}

interface Props {
  authors: User[];
  tagsAvailable: Tag[];
}

export default function RecipesFilterBar({
  authors, tagsAvailable
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValues = getDefaultValues();
  const theme = useTheme();
  const { handleSubmit, control, watch, reset } = useForm<FormValues>({ defaultValues });

  const watchedTags = watch('tags');
  const watchedAuthor = watch('author');

  useEffect(handleWatchedFieldsChange, [watchedTags, watchedAuthor]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='row' spacing={2} mb={2}>
        <Controller 
          name="query"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField 
              {...field}
              type="text"
              label="Поиск..."
              error={!!error}
              helperText={error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              size="small"
            />
          )}
        />
        <Controller 
          name='tags'
          control={control}
          render={({ field, fieldState: { error }}) => (
            <Fragment>
              <Select
                {...field}
                multiple
                error={!!error}
                size="small"
                style={{ minWidth: 200 }}
              >
                {tagsAvailable.map(tag => (
                  <MenuItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </Fragment>
          )}
        />
        <Controller 
          name="author"
          control={control}
          render={({ field, fieldState: { error }}) => (
            <Select
              {...field}
              size="small"
              style={{ minWidth: 200 }}
              // aria-label="Автор"
            >
              {authors.map(author => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
                </MenuItem>
              ))}
              {/* TODO - WTF, why this color doesn't work??? */}
              <MenuItem key={0} value={0} color={theme.palette.grey[50]} >
                Выбрать автора
              </MenuItem>
            </Select>
          )}
        />
        {/*
        <Button type="reset" size="small" variant="outlined">
          Сбросить
        </Button>
        <Button type="submit" size="small" variant="contained">
          Применить
        </Button>
        */}
      </Stack>
    </form>
  )

  function onSubmit(filters: FormValues) {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.tags.length > 0) params.set('tags', filters.tags.join(','))
    else params.delete('tags');

    if (filters.query.length > 0) params.set('query', filters.query);
    else params.delete('query');

    if (filters.author) params.set('author', filters.author.toString());
    else params.delete('author');

    router.push(`?${params.toString()}`);
    // const tags = data.tags.join(',');
    // const query = data.query;
  }

  function getDefaultValues(): FormValues {
    const defaultValues: FormValues = {
      query: "",
      tags: [],
      author: 0,
    }
    const tagsStr = searchParams.get('tags');
    const queryStr = searchParams.get('query');
    if (tagsStr) defaultValues.tags = tagsStr.split(',').map(tag => parseInt(tag))
    if (queryStr) defaultValues.query = queryStr;
    return defaultValues;
  }

  function handleWatchedFieldsChange() {
    handleSubmit(onSubmit)();
  }
}

