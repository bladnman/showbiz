import React from "react";
import Box from "@mui/material/Box";

export default function Shim({
  height,
  width,
}: {
  height?: number;
  width?: number;
}) {
  const style: Record<string, unknown> = {};
  if (height !== undefined && height !== null) {
    if (isNaN(height)) style.height = height;
    else style.height = `${height}em`;
  }
  if (width !== undefined && width !== null) {
    if (isNaN(width)) style.width = width;
    else style.width = `${width}em`;
  }
  return <Box sx={style} className={"shim"} />;
}
