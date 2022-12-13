import React from "react";
import { Typography } from "@mui/material";
import { SxPropOpt } from "../../../@types";
import { IMAGE_TEXT_SHADOW } from "../../../utils/CONST";

export default function DetailsImageText({
  text,
  sx,
}: { text?: string | null } & SxPropOpt) {
  return (
    <Typography
      component="span"
      sx={{
        textShadow: IMAGE_TEXT_SHADOW,
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
}
