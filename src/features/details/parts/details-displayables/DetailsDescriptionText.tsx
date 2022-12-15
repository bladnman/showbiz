import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShowPropOpt } from "@types";
import { IMAGE_TEXT_SHADOW } from "@CONST";

/** https://html-css-js.com/css/generator/text-shadow/ */

const StyledText = styled(Typography)(
  ({
    maxLines,
    fontSize,
  }: {
    maxLines?: number;
    fontSize?: number | string;
  }) => {
    const maxLinesCss: any = {};
    if (maxLines) {
      maxLinesCss.display = "-webkit-box";
      maxLinesCss.WebkitLineClamp = maxLines;
      maxLinesCss.WebkitBoxOrient = "vertical";
      maxLinesCss.overflow = "hidden";
    }
    return {
      fontSize: fontSize ?? "1.2em",
      textShadow: IMAGE_TEXT_SHADOW,
      // line clamping
      ...maxLinesCss,
    };
  }
);

export default function DetailsDescriptionText({
  show,
  fontSize = "1.2em",
  maxLines,
  onClick,
}: {
  maxLines?: number;
  fontSize?: number | string;
  onClick?: () => void;
} & ShowPropOpt) {
  return (
    <StyledText fontSize={fontSize} maxLines={maxLines} onClick={onClick}>
      {show?.description}
    </StyledText>
  );
}
