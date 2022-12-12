import Box from "@mui/material/Box";
import DetailsRatingDisplay from "../components/DetailsRatingDisplay";
import DetailsPosterTile from "../components/DetailsPosterTile";
import DetailsCtaGroup from "../components/details-cta-group/DetailsCtaGroup";
import React from "react";
import { ShowPropOpt } from "../../../@types";

export default function DetailsLayoutPoster({ show }: ShowPropOpt) {
  return (
    <Box>
      <Box height={"6em"}>
        <DetailsRatingDisplay show={show} />
      </Box>
      <DetailsPosterTile show={show} width={200} />
      <Box height={"3em"} flexShrink={0} flexGrow={0} display="flex">
        <DetailsCtaGroup show={show} />
      </Box>
    </Box>
  );
}
