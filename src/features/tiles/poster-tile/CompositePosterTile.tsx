import React from "react";
import { Box, SxProps } from "@mui/material";
import BasePosterTile from "@features/tiles/poster-tile/base-poster-tile/BasePosterTile";
import getPosterSize from "@show-utils/getPosterSize";
import { CompositePosterTileProps } from "./poster-tile-types";
import SelectablePosterTileBg from "@features/tiles/poster-tile/selected-poster-tile/SelectablePosterTileBg";
import SelectablePosterTileFg from "@features/tiles/poster-tile/selected-poster-tile/SelectablePosterTileFg";
import HoldPosterTileFg from "@features/tiles/poster-tile/hold-poster-tile/HoldPosterTileFg";
import RatingPosterTile from "@features/tiles/poster-tile/rating-poster-tile/RatingPosterTile";

export default function CompositePosterTile(props: CompositePosterTileProps) {
  const { show, height, width } = props;
  const size = getPosterSize(width, height);
  if (!show) return null;

  const posterShapeSx = {
    overflow: "hidden",
    borderRadius: 3,
    width: size.width,
    height: size.height,
  };

  return (
    <Box position={"relative"} width={size.width} height={size.height}>
      {/* BEHIND - allows for outside of poster rectangle display */}
      <PosterLayer sx={{ zIndex: 0 }}>
        <SelectablePosterTileBg {...props} />
        {/*<PosterLayer sx={{ top: "-0.5em" }}>*/}
        {/*  <RatingPosterTile {...props} />*/}
        {/*</PosterLayer>*/}
      </PosterLayer>

      {/* POSTER SHAPE - clipped to poster rectangle */}
      <PosterLayer sx={{ ...posterShapeSx, zIndex: 10 }}>
        {/* POSTER IMAGE - clipped to poster rectangle */}
        <PosterLayer sx={{ zIndex: 11 }}>
          <BasePosterTile {...props} /> {/* handles clicks */}
        </PosterLayer>

        {/* IN FRONT - clipped to poster rectangle */}
        <PosterLayer sx={{ pointerEvents: "none", zIndex: 12 }}>
          <PosterLayer>
            <HoldPosterTileFg {...props} />
          </PosterLayer>

          <PosterLayer>
            <Box sx={{ position: "absolute", bottom: "-0.5em", right: 0 }}>
              <RatingPosterTile {...props} />
            </Box>
          </PosterLayer>

          <PosterLayer>
            <SelectablePosterTileFg {...props} />
          </PosterLayer>
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
