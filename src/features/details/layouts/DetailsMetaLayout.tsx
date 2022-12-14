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

export default function DetailsMetaLayout({ show }: ShowPropOpt) {
  if (!show) return null;
  return (
    <Stack direction={"column"}>
      <Stack direction={"row"} spacing={5}>
        <DetailsYearTag show={show} />
        <DetailsSeasonEpisodeCount show={show} />
      </Stack>
      <DetailsShowTitle
        show={show}
        sx={{
          marginTop: 1,
        }}
      />
      <Stack direction={"row"} spacing={5} height={"1.5em"} flexShrink={0}>
        <DetailsGenreList show={show} />
        <DetailsDuration show={show} />
        <DetailsBoxOffice show={show} />
      </Stack>
      <DetailsDescriptionText show={show} />
    </Stack>
  );
}
