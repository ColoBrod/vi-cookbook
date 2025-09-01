import { Box, Grid } from "@mui/material";
import FabAdd from "@/app/components/FabAdd";
import CreateCollectionForm from "./components/CreateCollectionForm";
import { AppEvent } from "@/constants/events";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getCollections } from "@/model/collections";
import CollectionCard from "./components/CollectionCard";

export default async function() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email!
  const collections = await getCollections(userEmail);

  return (
    <Box p={2} position='relative'>
      <Grid container spacing={2}>
        {collections.map(collection => (
          <Grid
            key={collection.id}
            size={{ xl: 3, lg: 4, md: 6, sm: 6, xs: 12 }}
          >
            <CollectionCard collection={collection} />
          </Grid>
        ))}
      </Grid>
      <CreateCollectionForm />
      <FabAdd event={AppEvent.Collection.ShowCreateForm} />
    </Box>
  );
}
