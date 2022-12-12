import { Stack } from "@mui/system";
import DetailsYearTag from "../components/DetailsYearTag";
import DetailsSeasonEpisodeCount from "../components/DetailsSeasonEpisodeCount";
import DetailsShowTitle from "../components/DetailsShowTitle";
import DetailsGenreList from "../components/DetailsGenreList";
import DetailsDuration from "../components/DetailsDuration";
import DetailsBoxOffice from "../components/DetailsBoxOffice";
import DetailsDescriptionText from "../components/DetailsDescriptionText";
import React from "react";
import { ShowPropOpt } from "../../../@types";

export default function DetailsLayoutMeta({ show }: ShowPropOpt) {
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
          marginBottom: 0,
          backdropFilter: "blur(10px) brightness(80%)",
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
