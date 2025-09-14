'use client'

import { Box, Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

import { z } from 'zod';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_RECIPE_IMAGE_URL } from '@/constants/images';

const mediaSchema = z.object({
  name: z.string().or(z.undefined()),
  file: z.instanceof(File).or(z.null()),
});

type MediaFormValues = z.infer<typeof mediaSchema>;

const defaultValues: MediaFormValues = {
  name: undefined,
  file: null,
};

export default function() {
  const { register, handleSubmit, control, setValue } = useForm<MediaFormValues>({ 
    resolver: zodResolver(mediaSchema),
    defaultValues: defaultValues,
  });

  const name = register('name');
  // const [imagePreview, setImagePreview] = useState(imagePath ?? DEFAULT_RECIPE_IMAGE_URL);

  return (
    <Box p={2} width={400}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          ref={name.ref}
          id="upload-image"
          type='file'
          name={name.name}
          // accept="image/*"
          onChange={(e) => {
            const value = e.currentTarget.value;
            const files = e.currentTarget.files as FileList;

            if (files.length !== 1) {
              setValue('name', value);
              setValue('file', null);
              // setImagePreview(DEFAULT_RECIPE_IMAGE_URL);
              return;
            }

            const file = files[0];
            setValue('name', value);
            setValue('file', file);
            const imageUrl = URL.createObjectURL(file);
            // e.currentTarget.value;
            // setImagePreview(imageUrl);
          }}
        />
        {/*
        <Controller 
          name="name"
          control={control}
          render={({ field, fieldState: {error} }) => (
            <TextField
              // {...field}
              // name='file'
              ref={field.ref}
              // name={field.name}
              value={field.value}
              type="file"
              variant="outlined"
              inputProps={{ accept: 'image/*' }}
              fullWidth
              margin="normal"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.currentTarget.files?.length !== 1) return;
                setValue('name', e.currentTarget.name);
                setValue('file', e.currentTarget.files[0]);
              }}
            />
          )}
        />
        */}
        <Button 
          type='submit'
          variant="contained" 
          color="primary" 
          // component="label"
          startIcon={<CloudUploadIcon />}
          fullWidth
        >
          Upload File
          {/* <input type="file" hidden /> */}
        </Button>
      </form>
    </Box>
  );

  function onSubmit(formValues: MediaFormValues) {
    console.log(formValues);
  }
}
