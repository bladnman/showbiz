import React from "react";
import { ShowPropOpt } from "@types";
import { Stack } from "@mui/system";
import Box from "@mui/material/Box";
import { useWindowSize } from "@hooks/useWindowSize";
import DetailsRatingDisplay from "@features/details/parts/details-displayables/DetailsRatingDisplay";
import PosterTile from "@features/tiles/postertile/PosterTile";
import DetailsAddButton from "@features/details/parts/details-interactables/DetailsAddButton";
import DetailsWatchStatusButton from "@features/details/parts/details-interactables/DetailsWatchStatusButton";
import DetailsDescriptionText from "@features/details/parts/details-displayables/DetailsDescriptionText";
import DetailsShowTitle from "@features/details/parts/details-displayables/DetailsShowTitle";

export default function DetailsTwoPanelLayout({ show }: ShowPropOpt) {
  const windowSize = useWindowSize();
  const backdropHeight = windowSize.height * 0.6;

  return (
    <Stack padding={3} paddingTop={7}>
      <Stack direction={"column"} spacing={1} marginTop={2}>
        <Stack direction={"row"} spacing={2}>
          <Stack
            flexShrink={0}
            direction={"column"}
            spacing={2}
            alignItems={"center"}
          >
            <DetailsRatingDisplay show={show} />
            <PosterTile show={show} width={150} />
            <Box flexGrow={0}>
              <DetailsAddButton show={show} />
            </Box>
            <Box flexGrow={0}>
              <DetailsWatchStatusButton show={show} />
            </Box>
          </Stack>
          <Box flexShrink={1}>
            <DetailsShowTitle
              show={show}
              fontSize={"2em"}
              sx={{
                marginBottom: 1,
              }}
            />
            <DetailsDescriptionText show={show} fontSize={"1em"} />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
