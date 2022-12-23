import React from "react";
import { Box } from "@mui/material";
import getPosterSize from "@show-utils/getPosterSize";
import { PosterTileProps } from "../poster-tile-types";

export default function BasePosterTile(props: PosterTileProps) {
  const { show, height, width, onClick } = props;
  const size = getPosterSize(width, height);

  const posterUrl = show?.posterPath ?? show?.profilePath;
  if (!show) return null;
  return (
    <Box
      sx={{
        height: size.height,
        width: size.width,
        overflow: "hidden",
        backgroundColor: "#00000033",
      }}
      borderRadius={3}
      onClick={(event) => onClick && onClick(show, event)}
    >
      <div
        style={{
          backgroundImage: `url('${posterUrl}')`,
          width: size.width,
          height: size.height,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </Box>
  );
}
