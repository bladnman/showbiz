import React from "react";
import { Box } from "@mui/material";
import { useMemo } from "react";
import { ShowPropOpt, SxPropOpt } from "@types";
import { TypoScore } from "../../../app/app-typo/apptypo";
import { styled } from "@mui/material/styles";
import { COLORS } from "../../../app/app-theme/theme_const";

const StyledText = styled<any>(TypoScore)(() => ({
  fontSize: "4em",

  /** INTERESTING OUTLINED TEXT */
  WebkitTextStrokeWidth: "4px",
  WebkitTextFillColor: COLORS.callout,
  WebkitTextStrokeColor: COLORS.bg_back,
}));

export default function DetailsRatingDisplay({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  const rating = useMemo(() => {
    if (!show || !show.voteAverage) return null;

    const cleanRating = ~~(show.voteAverage * 10) / 10;
    if (`${cleanRating}`.indexOf(".") > -1) return cleanRating;
    return `${cleanRating}.0`;
  }, [show]);

  if (!rating) return null;
  return <StyledText component={"div"}>{rating}</StyledText>;
}
