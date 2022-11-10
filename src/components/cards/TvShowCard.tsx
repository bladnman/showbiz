import { useMemo } from "react";
import { TvShow } from "../../TMDB/types";
import BottomCard from "./BottomCard";

export default function TvShowCard({ show }: { show: TvShow }) {
  if (!show) return null;

  const rating = (show.voteAverage ?? 0) / 2;
  const metaDescription = useMemo(() => {
    if (!show.numberOfEpisodes) return null;
    let desc = `Episodes: ${show.numberOfEpisodes}`;
    if (!show.seasons) {
      desc = `Seasons: ${show.seasons} | ${desc}`;
    }
  }, [show]);

  if (!show.name) return null;
  return (
    <BottomCard
      imageUrl={`https://image.tmdb.org/t/p/original${show.backdropPath}`}
      title={show.name}
      description={show.overview}
      rating={rating}
      metaDescription={metaDescription}
    />
  );
}
