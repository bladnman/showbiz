import { ShowPropOpt, SxPropOpt } from "../../../@types";
import DetailsImageText from "./DetailsImageText";

export default function DetailsSeasonEpisodeCount({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  if (!show || !show.isTv) return null;

  return (
    <DetailsImageText
      text={`${show.numberOfSeasons} seasons | ${show.numberOfEpisodes} episodes`}
    />
  );
}
