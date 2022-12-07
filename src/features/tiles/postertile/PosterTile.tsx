import { Box } from "@mui/material";
import { useMemo } from "react";
import { ShowbizItem, ShowPropOpt, Size } from "../../../@types";
import { posterWidthToHeightRatio } from "../../../store/const";

export default function PosterTile({
  show,
  height,
  width,
  onClick,
}: ShowPropOpt & {
  height?: number;
  width?: number;
  onClick?: (show: ShowbizItem) => void;
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

  return (
    <Box
      sx={{
        height: size.height,
        width: size.width,
        overflow: "hidden",
        backgroundColor: "#00000033",
      }}
      borderRadius={3}
      onClick={() => onClick && show && onClick(show)}
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
