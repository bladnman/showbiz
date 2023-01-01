import React from "react";
import { ShowPropOpt } from "@types";
import { IMAGE_TEXT_SHADOW } from "@CONST";
import TextExpandOnClick from "@components/collapsers/TextExpandOnClick";

/** https://html-css-js.com/css/generator/text-shadow/ */

export default function DetailsDescriptionText({
  show,
  defaultToClamped = false,
  sx,
  maxLines,
}: {
  maxLines?: number;
  fontSize?: number | string;
  onClick?: () => void;
  defaultToClamped?: boolean;
  sx?: [] | object;
} & ShowPropOpt) {
  const styles = {
    ...sx,
    textShadow: IMAGE_TEXT_SHADOW,
  };

  return (
    <TextExpandOnClick
      text={show?.description}
      maxLines={maxLines}
      sx={styles}
      defaultToClamped={defaultToClamped}
    />
  );
}
