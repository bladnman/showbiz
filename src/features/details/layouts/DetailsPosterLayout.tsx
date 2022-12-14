import DetailsRatingDisplay from "../parts/details-displayables/DetailsRatingDisplay";
import React from "react";
import { ShowPropOpt } from "@types";
import { Stack } from "@mui/system";
import DetailsAddButton from "@features/details/parts/details-interactables/DetailsAddButton";
import PosterTile from "@features/tiles/postertile/PosterTile";
import DetailsWatchStatusButton from "@features/details/parts/details-interactables/DetailsWatchStatusButton";

export default function DetailsPosterLayout({ show }: ShowPropOpt) {
  return (
    <Stack direction={"column"} spacing={1} marginTop={2} alignItems={"center"}>
      <DetailsRatingDisplay show={show} />
      <PosterTile show={show} width={200} />
      <DetailsAddButton show={show} />
      <DetailsWatchStatusButton show={show} />
    </Stack>
  );
}
