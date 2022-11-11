import { useMemo } from "react";
import { Tv } from "../../TMDB/types";
import BottomCard from "./BottomCard";
import { useBaseImageUrl } from "../../TMDB/hooks/useApi";

export default function TvCard({ show }: { show: Tv }) {
  if (!show) return null;

  const baseImgUrl = useBaseImageUrl();

  const rating = (show.voteAverage ?? 0) / 2;
  const metaDescription = useMemo(() => {
    if (!show.numberOfEpisodes) return null;
    let desc = `Episodes: ${show.numberOfEpisodes}`;
    if (show.numberOfSeasons) {
      desc = `Seasons: ${show.numberOfSeasons} | ${desc}`;
    }
    return desc;
  }, [show]);

  if (!show.name) return null;
  return (
    <BottomCard
      imagePosterUrl={`${baseImgUrl}${show.posterPath}`}
      imageBackdropUrl={`${baseImgUrl}${show.backdropPath}`}
      title={show.name}
      description={show.overview}
      rating={rating}
      metaDescription={metaDescription}
    />
  );
}
