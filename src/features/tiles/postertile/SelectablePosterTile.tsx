import React from "react";
import { Box } from "@mui/material";
import PosterTile, {
  PosterTileProps,
} from "@features/tiles/postertile/PosterTile";
import useShowTools from "@hooks/useShowTools";
import { getPosterSize } from "@utils/itemUtils";
import { COLORS } from "@/features/app/app-theme/theme_const";

type SelectablePosterTileProps = PosterTileProps & {
  selected?: boolean;
};
export default function SelectablePosterTile(props: SelectablePosterTileProps) {
  const { selected = false, ...posterProps } = props;
  const { show, height, width } = posterProps;

  const size = getPosterSize(width, height);

  if (!show) return null;

  // UNSELECTED
  if (!selected) {
    return <PosterTile {...props} />;
  }

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
    >
      {/* POSTER */}
      <Box position={"absolute"} width={size.width} height={size.height}>
        <PosterTile {...posterProps} />
      </Box>

      {/* SELECTION INDICATOR */}
      <Box
        position={"absolute"}
        width={size.width}
        height={size.height}
        sx={{
          pointerEvents: "none",
          // backgroundColor: "rgba(249,208,15,0.2)",
          backgroundColor: "rgba(255,255,255,0.2)",
          // border: `8px solid ` + COLORS.callout,
          border: `5px solid ` + COLORS.primary,
          borderRadius: 3,
          boxSizing: "border-box",
        }}
      />
    </Box>
  );
}
