import React from "react";
import { Box, Typography } from "@mui/material";
import { SxPropOpt } from "../../@types";

export default function Tag({ children, sx }: { children?: any } & SxPropOpt) {
  return (
    <Box>
      <Typography
        component="span"
        sx={{
          ...sx,
          paddingX: 1.2,
          paddingY: 0.3,
          borderColor: "#ffffffaa",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "0.3em",
          backgroundColor: "#00000044",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
