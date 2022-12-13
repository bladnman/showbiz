import React from "react";
import { Box } from "@mui/material";
import AppSearchField from "../../../components/AppSearchField";

export default function DetailsSearchField(props: any) {
  return (
    <Box
      {...props}
      paddingX={3}
      paddingTop={0.3}
      paddingBottom={1}
      sx={{
        backdropFilter: "blur(2px) brightness(60%)",
      }}
    >
      <AppSearchField />
    </Box>
  );
}
