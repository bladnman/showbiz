import React from "react";
import { Typography } from "@mui/material";
import { styleLineClamp } from "@utils/styleUtils";

export default function TextClamper({
  text,
  maxLines,
  onClick,
  sx,
}: {
  text?: string;
  maxLines?: number;
  onClick?: () => void;
  sx: [] | object;
}) {
  return (
    <Typography
      onClick={onClick}
      sx={{
        ...(Array.isArray(sx) ? sx : sx),
        ...styleLineClamp(maxLines),
      }}
    >
      {text}
    </Typography>
  );
}
