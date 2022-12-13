import { Stack } from "@mui/system";
import DetailsYearTag from "../parts/DetailsYearTag";
import DetailsSeasonEpisodeCount from "../parts/DetailsSeasonEpisodeCount";
import DetailsShowTitle from "../parts/DetailsShowTitle";
import DetailsGenreList from "../parts/DetailsGenreList";
import DetailsDuration from "../parts/DetailsDuration";
import DetailsBoxOffice from "../parts/DetailsBoxOffice";
import DetailsDescriptionText from "../parts/DetailsDescriptionText";
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
