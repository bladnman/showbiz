import React from "react";
import { Box } from "@mui/material";
import { MouseEvent, useMemo } from "react";
import { ShowbizItem, ShowPropOpt, Size } from "@types";
import { posterWidthToHeightRatio } from "../../../store/const";

export default function PosterTile({
  show,
  height,
  width,
  onClick,
}: ShowPropOpt & {
  height?: number;
  width?: number;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
}) {
  const size = useMemo(() => {
    const theSize = { width: width, height: height };
    if (height) {
      theSize.width = height * posterWidthToHeightRatio;
    } else if (width) {
      theSize.height = width / posterWidthToHeightRatio;
    }
    return theSize as Size;
  }, [height, width]);

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
          width: "100%",
          height: size.height,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </Box>
  );
}
