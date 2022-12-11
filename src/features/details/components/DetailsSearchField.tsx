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
        backgroundColor: "#00000077",
        borderColor: "#404040",
        borderStyle: "solid",
        borderRadius: 5,
      }}
    >
      <AppSearchField />
    </Box>
  );
}
