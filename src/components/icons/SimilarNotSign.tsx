import { Box } from "@mui/material";
import React from "react";

export default function SimilarNotSign({ size = 12 }: { size?: number }) {
  return (
    <Box width={size} height={size}>
      <svg id="b" xmlns="http://www.w3.org/2000/svg">
        <path d="m60.71,47.69c-1.52,0-3.09-.1-4.72-.32-5.84-.81-11.27-3.61-16.52-6.32-4.87-2.51-9.47-4.89-13.78-5.37-5.88-.65-14.73,3.12-18.86,6.1l-4.68-6.49c4.78-3.44,15.64-8.55,24.43-7.56,5.78.65,11.26,3.48,16.56,6.21,4.87,2.51,9.46,4.89,13.95,5.51,8.49,1.17,15.27-1.95,19.64-4.4l3.92,6.97c-2.68,1.51-10.11,5.68-19.93,5.68Z" />
      </svg>
    </Box>
  );
}
