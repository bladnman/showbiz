import { useMemo } from "react";
import { useBaseImageUrl } from "../../TMDB/hooks/useApi";
import { Movie } from "../../TMDB/types";
import { fLeft } from "../../utils/MU";
import useBreakSize from "../../utils/useBreakSize";
import BottomCard from "./BottomCard";
import { CardProps } from "./types";

export default function MovieCard(props: CardProps) {
  const { height, expanded, maxDescLines } = props;
  const item = props.item as Movie;
  if (!item) return null;
  const baseImgUrl = useBaseImageUrl();
  const { isGtXs } = useBreakSize();

  const rating = (item.voteAverage ?? 0) / 2;
  const year = fLeft(item.releaseDate, "-");

  const imgUrl = useMemo(
    () => (isGtXs ? item.backdropPath : item.posterPath),
    [isGtXs]
  );
  if (!item.title) return null;
  return (
    <BottomCard
      imagePosterUrl={`${baseImgUrl}${item.posterPath}`}
      imageBackdropUrl={`${baseImgUrl}${item.backdropPath}`}
      title={item.title}
      description={item.overview}
      rating={rating}
      metaDescription={year ? `Released: ${year}` : null}
      height={height}
      expanded={expanded}
      maxDescLines={maxDescLines}
    />
  );
}
