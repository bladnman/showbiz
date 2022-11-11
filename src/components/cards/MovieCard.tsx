import { useMemo } from "react";
import { useBaseImageUrl } from "../../TMDB/hooks/useApi";
import { Movie } from "../../TMDB/types";
import { fLeft } from "../../utils/MU";
import useBreakSize from "../../utils/useBreakSize";
import BottomCard from "./BottomCard";

export default function MovieCard({ show }: { show: Movie }) {
  if (!show) return null;
  const baseImgUrl = useBaseImageUrl();
  const { isGtXs } = useBreakSize();

  const rating = (show.voteAverage ?? 0) / 2;
  const year = fLeft(show.releaseDate, "-");

  const imgUrl = useMemo(
    () => (isGtXs ? show.backdropPath : show.posterPath),
    [isGtXs]
  );
  if (!show.title) return null;
  return (
    <BottomCard
      imagePosterUrl={`${baseImgUrl}${show.posterPath}`}
      imageBackdropUrl={`${baseImgUrl}${show.backdropPath}`}
      title={show.title}
      description={show.overview}
      rating={rating}
      metaDescription={year ? `Released: ${year}` : null}
    />
  );
}
