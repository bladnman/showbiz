import React from "react";
import { Box } from "@mui/material";
import { COLORS } from "@features/app/app-theme/theme_const";
import getPosterSize from "@show-utils/getPosterSize";
import { SelectablePosterTileProps } from "../poster-tile-types";

export default function SelectablePosterTileFg(
  props: SelectablePosterTileProps
) {
  if (!props.selected) return null;
  return (
    <Box
      height={"100%"}
      sx={{
        backgroundColor: "rgba(255,255,255,0.2)",
        border: `5px solid ` + COLORS.primary,
        borderRadius: 3,
        boxSizing: "border-box",
      }}
    />
  );
}
