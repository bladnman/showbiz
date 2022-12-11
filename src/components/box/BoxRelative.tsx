import React from "react";
import Box from "@mui/material/Box";

export default function BoxRelative(props: any) {
  const { children, sx, ...otherProps } = props || {};
  return (
    <Box
      {...otherProps}
      sx={{
        width: "100%",
        ...sx,
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
