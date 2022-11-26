import { Box } from "@mui/material";
import { ShowPropOpt } from "../../../@types";
import { posterWidthtoHeightRatio } from "../../../store/const";
import useBreakSize from "../../../utils/useBreakSize";

export default function PosterTile({ show }: ShowPropOpt) {
  const { isGtXs } = useBreakSize();
  const height = isGtXs ? 300 : 220;
  const width = posterWidthtoHeightRatio * height;
  return (
    <Box
      sx={{
        height: height,
        width: width,
        overflow: "hidden",
        backgroundColor: "#00000033",
      }}
      borderRadius={3}
    >
      <div
        style={{
          backgroundImage: `url('${show?.posterPath}')`,
          width: "100%",
          height: height,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </Box>
  );
}
