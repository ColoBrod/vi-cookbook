import { Box, Fab } from "@mui/material";
import FabAdd from "@/app/components/FabAdd";
import CreateCollectionForm from "./components/CreateCollectionForm";

export default async function() {

  return (
    <Box p={2} position='relative'>
      <CreateCollectionForm />
      <FabAdd href='/collections/add' />
    </Box>
  );
}
