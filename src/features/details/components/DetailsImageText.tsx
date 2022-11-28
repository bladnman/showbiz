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
        textShadow:
          "2px 2px 0px rgba(0,0,0,0.55), 7px 6px 0px rgba(0,0,0,0.15)",
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
}
