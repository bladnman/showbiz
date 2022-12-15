import React from "react";
import { ShowPropOpt } from "@types";
import { Stack } from "@mui/system";
import Box from "@mui/material/Box";
import { useWindowSize } from "@hooks/useWindowSize";
import BoxRelative from "@components/box/BoxRelative";
import BoxAbsolute from "@components/box/BoxAbsolute";
import DetailsMetaLayout from "./DetailsMetaLayout";
import DetailsBackdropImage from "../parts/details-displayables/DetailsBackdropImage";
import { GLASS_BACKDROP_FILTER } from "@CONST";
import DetailsRatingDisplay from "@features/details/parts/details-displayables/DetailsRatingDisplay";
import PosterTile from "@features/tiles/postertile/PosterTile";
import DetailsAddButton from "@features/details/parts/details-interactables/DetailsAddButton";
import DetailsWatchStatusButton from "@features/details/parts/details-interactables/DetailsWatchStatusButton";

export default function DetailsTwoPanelLayout({ show }: ShowPropOpt) {
  const windowSize = useWindowSize();
  const backdropHeight = windowSize.height * 0.6;

  return (
    <BoxRelative
      height={"100%"}
      className={"detail-templates-area"}
      onClick={() => console.log(show)}
    >
      {/* HEADER IMAGE
        ---------------------------- */}
      <BoxAbsolute
        className={"detail-templates-image-bg"}
        height={backdropHeight}
        sx={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      >
        <DetailsBackdropImage show={show} />
      </BoxAbsolute>

      {/* contents
        ---------------------------- */}
      <BoxRelative
        className={"detail-templates-meta"}
        height={backdropHeight}
        display="flex"
        direction={"row"}
        alignItems={"end"}
      >
        <Stack
          display="flex"
          direction={"row"}
          alignItems={"flex-end"}
          className="details-template-data-table"
        >
          {/* left-side
              ---------------------------- */}
          <Box
            paddingX={2}
            paddingBottom={3}
            display="flex"
            flexDirection={"column"}
          >
            <Stack
              direction={"column"}
              spacing={1}
              marginTop={2}
              alignItems={"center"}
            >
              <DetailsRatingDisplay show={show} />
              <PosterTile show={show} width={200} />
              <DetailsAddButton show={show} />
              <DetailsWatchStatusButton show={show} />
            </Stack>
          </Box>

          {/* right-side
              ---------------------------- */}
          <Stack
            className={"details-template-right-panel"}
            direction={"column"}
          >
            <Box
              className={"details-template-meta-area"}
              padding={3}
              sx={{
                backdropFilter: GLASS_BACKDROP_FILTER,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.50) 80%)",
              }}
            >
              <DetailsMetaLayout show={show} />
            </Box>
          </Stack>
        </Stack>
      </BoxRelative>
    </BoxRelative>
  );
}
