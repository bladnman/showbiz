import { useMemo } from "react";
import { Tv } from "../../TMDB/types";
import BottomCard from "./BottomCard";
import { useBaseImageUrl } from "../../TMDB/hooks/useApi";
import { CardProps } from "./types";

export default function TvCard(props: CardProps) {
  const { height, expanded } = props;
  const item = props.item as Tv;
  if (!item) return null;

  const baseImgUrl = useBaseImageUrl();

  const rating = (item.voteAverage ?? 0) / 2;
  const metaDescription = useMemo(() => {
    if (!item.numberOfEpisodes) return null;
    let desc = `Episodes: ${item.numberOfEpisodes}`;
    if (item.numberOfSeasons) {
      desc = `Seasons: ${item.numberOfSeasons} | ${desc}`;
    }
    return desc;
  }, [item]);

  if (!item.name) return null;
  return (
    <BottomCard
      imagePosterUrl={`${baseImgUrl}${item.posterPath}`}
      imageBackdropUrl={`${baseImgUrl}${item.backdropPath}`}
      title={item.name}
      description={item.overview}
      rating={rating}
      metaDescription={metaDescription}
      height={height}
      expanded={expanded}
    />
  );
}
