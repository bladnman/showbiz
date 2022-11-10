import { Movie } from "../../TMDB/types";
import { fLeft } from "../../utils/MU";
import BottomCard from "./BottomCard";

export default function MovieCard({ show }: { show: Movie }) {
  if (!show) return null;

  const rating = (show.voteAverage ?? 0) / 2;
  const year = fLeft(show.releaseDate, "-");

  if (!show.title) return null;
  return (
    <BottomCard
      imageUrl={`https://image.tmdb.org/t/p/original${show.backdropPath}`}
      title={show.title}
      description={show.overview}
      rating={rating}
      metaDescription={year ? `Released: ${year}` : null}
    />
  );
}
