import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";

export default function NotFoundTile() {
  return (
    <Box width={250} height={200}>
      <Paper>
        <Stack
          width={250}
          height={200}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography>Not Found</Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
