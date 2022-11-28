import { Box } from "@mui/material";
import { useMemo } from "react";
import { ShowPropOpt, Size } from "../../../@types";
import { ShowbizItem } from "../../../services/TMDB/utils/convertToItem";
import { posterWidthtoHeightRatio } from "../../../store/const";

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
      theSize.width = height * posterWidthtoHeightRatio;
    } else if (width) {
      theSize.height = width / posterWidthtoHeightRatio;
    }
    return theSize as Size;
  }, [height, width]);

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
          backgroundImage: `url('${show?.posterPath}')`,
          width: "100%",
          height: size.height,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </Box>
  );
}
