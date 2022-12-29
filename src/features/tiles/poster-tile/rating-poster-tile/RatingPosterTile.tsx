import React, { useMemo } from "react";
import { SelectablePosterTileProps } from "@features/tiles/poster-tile/poster-tile-types";
import {
  DotEmptyIcon,
  DotFullIcon,
  DotHalfIcon,
  DotOneThirdIcon,
  DotTwoThirdIcon,
} from "@/images/AppIcons";
import { Stack } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { COLORS } from "@features/app/app-theme/theme_const";

export default function RatingPosterTile(props: SelectablePosterTileProps) {
  const { show } = props;
  const rating = useMemo(() => {
    if (!show || !show.voteAverage) return null;

    const cleanRating = ~~(show.voteAverage * 10) / 10;
    if (`${cleanRating}`.indexOf(".") > -1) return cleanRating;
    return `${cleanRating}.0`;
  }, [show]);

  if (!show?.voteAverage) return null;

  const opacity = 1.0;

  return (
    <Stack
      direction={"row"}
      justifyContent={"flex-end"}
      spacing={0.5}
      sx={{
        opacity: opacity,
        paddingLeft: 1.5,
        paddingRight: 1.8,
        paddingTop: 0.3,
        paddingBottom: 1,
        // backgroundColor: COLORS.callout,
        // backgroundColor: COLORS.bg_front,
        backgroundColor: COLORS.bg_drawer,
        marginRight: -0.9,
        borderRadius: 2,
      }}
    >
      <Typography variant={"body2"} sx={{ color: COLORS.dim }}>
        {/*<Typography variant={"button"} sx={{ color: COLORS.callout }}>*/}
        {/*<Typography variant={"button"} sx={{ color: COLORS.bg_back }}>*/}
        {rating}
      </Typography>
    </Stack>
  );
}
