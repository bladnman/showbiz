import { Box } from "@mui/material";
import { useMemo } from "react";
import { ShowPropOpt, SxPropOpt } from "../../../@types";
import { TypoScore } from "../../apptypo/apptypo";
import { styled } from "@mui/material/styles";

const StyledText = styled(TypoScore)(() => ({
  // textShadow: "2px 2px 0px rgba(0,0,0,0.55), 7px 6px 0px rgba(0,0,0,0.15)",
  // "-webkit-text-stroke": "1px #606060",

  fontSize: "4em",

  /** INTERESTING OUTLINED TEXT */
  "-webkit-text-fill-color": "#ffffff",
  "-webkit-text-stroke-width": "4px",
  "-webkit-text-stroke-color": "green",
}));

export default function DetailsRatingDisplay({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  const rating = useMemo(() => {
    if (!show || !show.voteAverage) return null;

    return ~~(show.voteAverage * 10) / 10;
  }, [show]);

  if (!rating) return null;
  return (
    <Box sx={sx} display={"flex"} justifyContent="center">
      <StyledText>{rating}</StyledText>
    </Box>
  );
}
