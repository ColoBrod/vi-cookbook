'use client'

import { useEffect, useRef, useReducer } from 'react';
import { Box, Button, Stack, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormProvider, useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import Preview from './Preview';
import { useHttpRequest } from '@/hooks/useHttpRequest';
import { Media } from '@/app/generated/prisma';
import { AxiosProgressEvent } from 'axios';
import { uploadReducer, uploadState, ActionType } from './uploadReducer';
import { mediaSchema, MediaFormValues } from './mediaSchema';
import { ACCEPTED_MIME_TYPES } from '@/constants/images';

const defaultValues: MediaFormValues = { file: null };

interface Props {
  media?: Media;
  uploadedRef?: React.RefObject<Media|null>
}

export default function MediaForm({ media, uploadedRef }: Props) {
  const innerRef = useRef<Media|null>(media ?? null);
  const uploaded = uploadedRef ?? innerRef;
  const makeRequest = useHttpRequest();
  const [upload, dispatch] = useReducer(uploadReducer, {
    ...uploadState,
    previewUrl: media?.path || ''
  });

  // console.log(upload.previewUrl);

  const formMethods = useForm<MediaFormValues>({ 
    resolver: zodResolver(mediaSchema),
    defaultValues: defaultValues,
  });
  const { register, handleSubmit, setValue, watch } = formMethods;

  const fileWatched = watch('file');
  const fileRegister = register('file');

  useEffect(fileChangedEffect, [fileWatched])

  return (
    <FormProvider {...formMethods} >
      <Box >
        <Stack spacing={1}>
          <Preview {...upload} />
          <input
            id="file-input"
            ref={fileRegister.ref}
            type='file'
            // accept="image/*"
            accept={ACCEPTED_MIME_TYPES.join(', ')}
            hidden
            onChange={handleFileChange}
          />
          <Button 
            type='button'
            variant="contained" 
            color="primary" 
            startIcon={<CloudUploadIcon />}
            fullWidth
            disabled={fileWatched === defaultValues.file}
            onClick={handleSubmit(onValid, onInvalid)}
          >
            Загрузить изображение
          </Button>
          <Box>
            {upload.error 
              ? <Alert severity='error'>
                  {upload.error}
                </Alert>
              : upload.completed
              ? <Alert severity='success'>
                  Success
                </Alert>
              : null}
          </Box>
        </Stack>
      </Box>
    </FormProvider>
  );

  async function onValid(formValues: MediaFormValues): Promise<void> {
    const { file } = formValues;
    const formData = new FormData();
    formData.append('file', file!);

    dispatch({ type: ActionType.SetCompleted, payload: false });

    const [method, url] = uploaded.current 
      ? ['put', `/api/media/${uploaded.current.id}`]
      : ['post', `/api/media`];

    const notificationMessage = uploaded.current
      ? 'Изображение обновлено'
      : 'Новое изображение загружено';

    makeRequest<Media>({
      url,
      config: { 
        method, 
        data: formData, 
        onUploadProgress,
      },
      callback: {
        onTry(response) {
          uploaded.current = response.data;
        },
        onFinally() {
          dispatch({ type: ActionType.SetCompleted, payload: true });
        }
      },
      notification: { success: notificationMessage },
    });
  }

  async function onInvalid(
    errors: FieldErrors<MediaFormValues>, 
    // event: React.BaseSyntheticEvent
  ) {
    const { file } = errors;
    if (file?.message === undefined) return;
    dispatch({ type: ActionType.SetError, payload: file.message })
  }

  function fileChangedEffect() {
    dispatch({ type: ActionType.SetError, payload: '' });
    if (fileWatched === null) {
      dispatch({ type: ActionType.SetPreview, payload: media?.path ?? "" });
      return;
    }
    const fileUrl = URL.createObjectURL(fileWatched);
    dispatch({ type: ActionType.SetPreview, payload: fileUrl });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files as FileList;
    if (files.length !== 1) {
      setValue('file', null);
      return;
    }
    const file = files[0];
    setValue('file', file);
  }

  function onUploadProgress(event: AxiosProgressEvent): void {
    const { loaded, total } = event;
    if (total === undefined) return;
    const percent = Math.round((loaded * 100) / total);
    dispatch({ type: ActionType.SetProgress, payload: percent });
  }
}

