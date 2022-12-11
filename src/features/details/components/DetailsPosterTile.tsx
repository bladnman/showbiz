import React from "react";
import { Box } from "@mui/material";
import { ShowPropOpt } from "../../../@types";
import PosterTile from "../../tiles/postertile/PosterTile";

export default function DetailsPosterTile({
  show,
  width,
}: ShowPropOpt & { width: number }) {
  return (
    <Box>
      <PosterTile show={show} width={width} />
    </Box>
  );
}
