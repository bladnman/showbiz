import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShowPropOpt, SxPropOpt } from "../../../@types";
import { TypoSmallCapsBlack } from "../../app/apptypo/apptypo";
import { IMAGE_TEXT_SHADOW } from "../../../utils/CONST";

/** https://html-css-js.com/css/generator/text-shadow/ */

const StyledText = styled(TypoSmallCapsBlack)(() => ({
  textShadow: IMAGE_TEXT_SHADOW,
  // "-webkit-text-stroke": "1px #606060",
  WebkitTextStrokeWidth: "1px",
  WebkitTextStrokeColor: "#606060",
  lineHeight: "1.0em",

  // textShadow:
  //   "2px 2px 6px rgba(0,0,0,0.3), 0px -5px 35px rgba(255,255,255,0.3);",
  // "-webkit-text-stroke-width": "2px",
  // "-webkit-text-stroke-color": "#9f9f9f",

  /** INTERSTING OUTLINED TEXT */
  // "-webkit-text-fill-color": "#d5ff2b",
  // "-webkit-text-stroke-width": "2px",
  // "-webkit-text-stroke-color": "black",
}));

export default function DetailsShowTitle({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  return (
    <Box sx={{ ...sx }}>
      <StyledText>{show?.name}</StyledText>
    </Box>
  );
}
