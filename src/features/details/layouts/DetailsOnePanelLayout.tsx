import React from "react";
import { ShowPropOpt } from "@types";
import { Stack } from "@mui/system";
import Box from "@mui/material/Box";
import DetailsRatingDisplay from "@features/details/parts/details-displayables/DetailsRatingDisplay";
import DetailsAddButton from "@features/details/parts/details-interactables/DetailsAddButton";
import DetailsWatchStatusButton from "@features/details/parts/details-interactables/DetailsWatchStatusButton";
import DetailsDescriptionText from "@features/details/parts/details-displayables/DetailsDescriptionText";
import DetailsShowTitle from "@features/details/parts/details-displayables/DetailsShowTitle";
import DetailsGenreList from "@features/details/parts/details-displayables/DetailsGenreList";
import DetailsDuration from "@features/details/parts/details-displayables/DetailsDuration";
import DetailsBoxOffice from "@features/details/parts/details-displayables/DetailsBoxOffice";
import DetailsYearTag from "@features/details/parts/details-displayables/DetailsYearTag";
import DetailsSeasonEpisodeCount from "@features/details/parts/details-displayables/DetailsSeasonEpisodeCount";
import DetailsMetaAdditionalLayout from "@features/details/layouts/DetailsMetaAdditionalLayout";
import Shim from "@components/Shim";
import DetailsShowSimilar from "@features/details/parts/details-displayables/DetailsShowSimilar";
import DetailsLanguages from "@features/details/parts/details-displayables/DetailsLanguages";
import DetailsCollectionList from "@features/details/parts/details-displayables/DetailsCollectionList";
import CompositePosterTile from "@features/tiles/poster-tile/CompositePosterTile";

const COLLAPSED_LINE_MAX = 4;
export default function DetailsOnePanelLayout({ show }: ShowPropOpt) {
  return (
    <Box padding={3} paddingTop={9} paddingBottom={0}>
      <Stack direction={"row"} spacing={3}>
        {/* POSTER */}
        <Box flexShrink={0}>
          <CompositePosterTile show={show} width={190} />
        </Box>

        {/* ACTIONS */}

        <Stack
          flexShrink={0}
          direction={"column"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {show && (
            <Stack
              flexShrink={0}
              direction={"column"}
              spacing={2}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <DetailsRatingDisplay show={show} />
              <Box flexGrow={0}>
                <DetailsAddButton show={show} />
              </Box>
              <Box flexGrow={0}>
                <DetailsWatchStatusButton show={show} />
              </Box>
              <DetailsBoxOffice show={show} />
            </Stack>
          )}
        </Stack>
      </Stack>

      <Box marginTop={1}>{show && <DetailsCollectionList show={show} />}</Box>

      <Box marginTop={1}>
        <DetailsGenreList show={show} />
      </Box>

      {show?.originalLanguage !== "en" && (
        <Box paddingY={0.5}>
          <DetailsLanguages show={show} />
        </Box>
      )}

      {/* TITLE & DESC */}
      <Box flexShrink={1}>
        <DetailsShowTitle
          show={show}
          fontSize={"2em"}
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
        />

        <Stack
          paddingBottom={2}
          spacing={1}
          direction={"column"}
          justifyContent={"space-between"}
        >
          <DetailsYearTag show={show} />
          <DetailsSeasonEpisodeCount show={show} />
          <DetailsDuration show={show} />
        </Stack>

        <DetailsDescriptionText
          show={show}
          defaultToClamped={true}
          maxLines={COLLAPSED_LINE_MAX}
        />
        <Shim height={0.5} />
        <DetailsMetaAdditionalLayout show={show} />
      </Box>
      <Shim height={1} />
      <DetailsShowSimilar show={show} />
    </Box>
  );
}
