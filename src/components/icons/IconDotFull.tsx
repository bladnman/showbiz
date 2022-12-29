import { Box } from "@mui/material";
import React from "react";
import { COLORS } from "@features/app/app-theme/theme_const";

export default function IconDotFull() {
  const onColor = COLORS.callout;
  const size = 7;

  return (
    <Box width={size} height={size}>
      <svg id="a" xmlns="http://www.w3.org/2000/svg">
        <circle
          id="cc"
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={onColor}
        />
      </svg>
    </Box>
  );
}
