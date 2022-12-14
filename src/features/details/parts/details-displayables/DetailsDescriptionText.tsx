import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShowPropOpt } from "@types";
import { IMAGE_TEXT_SHADOW } from "@CONST";

/** https://html-css-js.com/css/generator/text-shadow/ */

const StyledText = styled(Typography)(() => ({
  fontSize: "1.2em",
  textShadow: IMAGE_TEXT_SHADOW,
}));

export default function DetailsDescriptionText({ show }: ShowPropOpt) {
  return <StyledText>{show?.description}</StyledText>;
}
