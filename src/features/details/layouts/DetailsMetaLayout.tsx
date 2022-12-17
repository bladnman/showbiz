import { Stack } from "@mui/system";
import DetailsYearTag from "../parts/details-displayables/DetailsYearTag";
import DetailsSeasonEpisodeCount from "../parts/details-displayables/DetailsSeasonEpisodeCount";
import DetailsShowTitle from "../parts/details-displayables/DetailsShowTitle";
import DetailsGenreList from "../parts/details-displayables/DetailsGenreList";
import DetailsDuration from "../parts/details-displayables/DetailsDuration";
import DetailsBoxOffice from "../parts/details-displayables/DetailsBoxOffice";
import DetailsDescriptionText from "../parts/details-displayables/DetailsDescriptionText";
import React from "react";
import { ShowPropOpt } from "@types";
import Shim from "@components/Shim";
import DetailsLinkToSites from "@features/details/parts/details-displayables/DetailsLinkToSites";
import DetailsOptionalStreamers from "@features/details/parts/details-interactables/DetailsOptionalStreamers";
import DetailsLanguages from "@features/details/parts/details-displayables/DetailsLanguages";
import DetailsMetaAdditionalLayout from "@features/details/layouts/DetailsMetaAdditionalLayout";
import { Box } from "@mui/material";
import DetailsCollectionList from "@features/details/parts/details-displayables/DetailsCollectionList";

export default function DetailsMetaLayout({ show }: ShowPropOpt) {
  if (!show) return null;
  return (
    <Stack direction={"column"} component={"div"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        component={"div"}
      >
        <Stack direction={"row"} spacing={5} component={"div"}>
          <DetailsYearTag show={show} />
          <DetailsSeasonEpisodeCount show={show} />
        </Stack>
        <DetailsCollectionList show={show} />
      </Stack>
      <Shim height={0.5} />
      <DetailsShowTitle show={show} />
      <Shim height={1} />
      <Stack
        direction={"row"}
        spacing={5}
        height={"1.5em"}
        flexShrink={0}
        component={"div"}
      >
        <DetailsGenreList show={show} />
        <DetailsDuration show={show} />
        <DetailsBoxOffice show={show} />
      </Stack>
      {show.originalLanguage !== "en" && (
        <Box paddingTop={0.5}>
          <DetailsLanguages show={show} />
        </Box>
      )}

      <Shim height={0.5} />
      <DetailsDescriptionText
        show={show}
        defaultToClamped={false}
        maxLines={3}
        sx={{ fontSize: "1.2em" }}
      />

      <Shim height={0.5} />
      <DetailsMetaAdditionalLayout show={show} />
    </Stack>
  );
}
