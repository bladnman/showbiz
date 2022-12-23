import React from "react";
import { Box, SxProps } from "@mui/material";
import BasePosterTile from "@features/tiles/poster-tile/base-poster-tile/BasePosterTile";
import getPosterSize from "@show-utils/getPosterSize";
import { CompositePosterTileProps } from "./poster-tile-types";
import SelectablePosterTileBg from "@features/tiles/poster-tile/selected-poster-tile/SelectablePosterTileBg";
import SelectablePosterTileFg from "@features/tiles/poster-tile/selected-poster-tile/SelectablePosterTileFg";
import HoldPosterTileFg from "@features/tiles/poster-tile/hold-poster-tile/HoldPosterTileFg";

export default function CompositePosterTile(props: CompositePosterTileProps) {
  const { show, height, width } = props;
  const size = getPosterSize(width, height);
  if (!show) return null;

  return (
    <Box
      position={"relative"}
      width={size.width}
      height={size.height}
      sx={{
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      {/* BG */}
      <PosterLayer sx={{ pointerEvents: "none", zIndex: 0 }}>
        <SelectablePosterTileBg {...props} />
      </PosterLayer>

      {/* POSTER */}
      <PosterLayer sx={{ zIndex: 1 }}>
        <BasePosterTile {...props} />
      </PosterLayer>

      {/* FG */}
      <PosterLayer sx={{ pointerEvents: "none", zIndex: 2 }}>
        <PosterLayer>
          <HoldPosterTileFg {...props} />
        </PosterLayer>

        <PosterLayer>
          <SelectablePosterTileFg {...props} />
        </PosterLayer>
      </PosterLayer>
    </Box>
  );
}
type LayerProps = {
  children: React.ReactNode;
  sx?: SxProps;
};

function PosterLayer(props: LayerProps) {
  return (
    <Box
      sx={{ ...props.sx }}
      position={"absolute"}
      top={0}
      left={0}
      right={0}
      bottom={0}
    >
      {props.children}
    </Box>
  );
}
