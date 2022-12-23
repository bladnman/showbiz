import React from "react";
import { Box } from "@mui/material";
import getPosterSize from "@show-utils/getPosterSize";
import { SelectablePosterTileProps } from "../poster-tile-types";

export default function SelectablePosterTileBg(
  props: SelectablePosterTileProps
) {
  const { selected = false, ...posterProps } = props;
  const { show, height, width } = posterProps;

  const size = getPosterSize(width, height);

  if (!show || !selected) return null;

  // SELECTED
  return (
    <Box
      position={"relative"}
      width={size.width}
      height={size.height}
      borderRadius={3}
      sx={{
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.7)",
        marginTop: "-2px",
        marginLeft: "-2px",
      }}
    />
  );
}
