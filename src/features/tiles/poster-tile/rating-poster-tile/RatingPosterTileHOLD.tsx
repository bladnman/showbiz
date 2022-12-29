import React from "react";
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

export default function RatingPosterTile(props: SelectablePosterTileProps) {
  const { show } = props;
  if (!show?.voteAverage) return null;

  const onFive = show.voteAverage / 2;
  const size = 9;
  const opacity = 1.0;
  const opacityOn = 1.0;
  const opacityOff = 1.0;
  return (
    <Tooltip title={`${show.voteAverage}`} arrow placement="top">
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={0.5}
        sx={{
          opacity: opacity,
          paddingLeft: 1.5,
          paddingRight: 1.5,
          paddingTop: 0.7,
          paddingBottom: 1.5,
          backgroundColor: "rgba(0,0,0,0.5)",
          marginRight: -0.7,
          borderRadius: 1,
        }}
      >
        {[1, 2, 3, 4, 5].map((val) => {
          // FULL
          if (onFive >= val) {
            return (
              <DotFullIcon
                key={val}
                width={size}
                height={size}
                opacity={opacityOn}
                style={{
                  color: "#fff",
                }}
              />
            );
          }

          // PARTIAL
          else {
            if (onFive + 0.25 >= val) {
              return (
                <DotTwoThirdIcon
                  key={val}
                  width={size}
                  height={size}
                  opacity={opacityOn}
                />
              );
            } else if (onFive + 0.65 >= val) {
              return (
                <DotHalfIcon
                  key={val}
                  width={size}
                  height={size}
                  opacity={opacityOn}
                />
              );
            } else if (onFive + 0.85 >= val) {
              return (
                <DotOneThirdIcon
                  key={val}
                  width={size}
                  height={size}
                  opacity={opacityOn}
                />
              );
            }
            return (
              <DotEmptyIcon
                key={val}
                width={size}
                height={size}
                opacity={opacityOff}
              />
            );
          }
        })}
      </Stack>
    </Tooltip>
  );
}
