import { Box, Button, IconButton, Stack, LinearProgress, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from "react-hook-form";
import { UploadState } from "./uploadReducer";

interface PreviewProps extends UploadState {}

export default function Preview({ 
  previewUrl: url, progress, completed, error
}: PreviewProps) {
  const { reset } = useFormContext();

  const controlButtons = url === ''
    ? (
      <Box sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Button 
          variant='outlined' 
          component='label' 
          htmlFor='file-input' 
          startIcon={<AddIcon />}
        >
          Выбрать изображение
        </Button>
      </Box>
    )
    : (
      <Stack 
        direction='row' 
        spacing={1}
        ml='auto' mr={1} mt={1}
        p={1}
        bgcolor='rgba(255,255,255, 0.3)'
        width='fit-content'
        borderRadius={1}
      >
        <IconButton 
          size="small"
          component='label'
          htmlFor='file-input' 
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton 
          size="small"
          component='label'
          onClick={() => reset()}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    );

  const progressOverlay = (
    <Box 
      height='100%' bgcolor='rgba(255,255,255, 0.8)' 
      display='flex' alignItems='center' justifyContent='center'
    >
      <Stack width='80%' spacing={1}>
        <Typography variant="body2" textAlign='center'>
          Загрузка: {progress}
        </Typography>
        <LinearProgress variant="determinate" value={progress} />
      </Stack>
    </Box>
  )

  return (
    <Box sx={{
      height: '100%',
      aspectRatio: '4 / 3',
      backgroundImage: url ? `url(${url})` : undefined,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      border: url ? undefined : '2px dashed rgba(25, 118, 210, 0.57)',
      boxSizing: 'border-box',
      borderRadius: 1,
    }}>
      {progress > 0 && progress < 100 
        ? progressOverlay
        : controlButtons}
    </Box>
  );
}
