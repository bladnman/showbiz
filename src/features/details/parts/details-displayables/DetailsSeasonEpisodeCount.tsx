import React from "react";
import { ShowPropOpt, SxPropOpt } from "@types";
import DetailsImageText from "../DetailsImageText";

export default function DetailsSeasonEpisodeCount({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  if (!show || !show.isTv) return null;

  let text = `${show.numberOfSeasons} seasons | ${show.numberOfEpisodes} episodes`;
  if (show.episodeRunTime?.length) {
    const totalRuntime = show.episodeRunTime[0];
    if (totalRuntime) {
      text += `  (${totalRuntime} min per)`;
    }
  }
  return <DetailsImageText text={text} />;
}
