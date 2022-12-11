import React from "react";
import { Typography } from "@mui/material";
import { SxPropOpt } from "../../../@types";

export default function DetailsImageText({
  text,
  sx,
}: { text?: string | null } & SxPropOpt) {
  return (
    <Typography
      component="span"
      sx={{
        textShadow: "1px 1px 2px rgba(0,0,0,0.65)",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
}
