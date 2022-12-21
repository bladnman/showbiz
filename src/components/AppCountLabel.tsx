import React from "react";
import { Box, BoxProps, Typography } from "@mui/material";

export default function AppCountLabel(props: BoxProps & { value?: number }) {
  const { value, sx, ...boxProps } = props;
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexShrink={0}
      flexGrow={0}
      sx={{
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        borderRadius: "1em",
        height: "1.5em",
        minWidth: "1.5em",
        padding: "0.25em",
        ...sx,
      }}
      {...boxProps}
    >
      <Typography>{value}</Typography>
    </Box>
  );
}
