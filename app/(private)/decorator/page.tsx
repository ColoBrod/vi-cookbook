'use client'

import { Box, Stack, Typography } from "@mui/material";
import User from "./lib";

const user = new User('Nicholas', 32);

export default function page() {

  console.log(user.surname);
  console.log(user);

  return (
    <Box p={2}>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      <Typography>
        {user.sayHello()}
      </Typography>
    </Box>
  );
}
