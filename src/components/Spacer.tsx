import { Box } from "@mui/material";

export default function Spacer({
  height,
  width,
  h,
  w,
}: {
  height?: number | string;
  width?: number | string;
  h?: number | string;
  w?: number | string;
}) {
  const fh = height ?? h;
  const fw = width ?? w;
  if (!fh && !fw) return null;
  return <Box width={fw} height={fh} />;
}
