import { Box, Rating, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { Movie, Person, Season, TvShow } from "../../TMDB/types";
import {
  isMovieType,
  isPersonType,
  isTvShowType,
} from "../../TMDB/utils/duckTyping";
import { fLeft } from "../../utils/MU";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import TvShowCard from "./TvShowCard";

export default function TopCard({ item }: { item: Movie | TvShow | Person }) {
  const renderCard = useCallback(() => {
    if (isMovieType(item)) return <MovieCard show={item as Movie} />;
    if (isTvShowType(item)) return <TvShowCard show={item as TvShow} />;
    if (isPersonType(item)) return <PersonCard person={item as Person} />;
    return null;
  }, [item]);

  if (!item) return null;
  return <Box onClick={() => console.log(`🐽 Item`, item)}>{renderCard()}</Box>;
}
const TvMeta = ({ show }: { show: TvShow }) => {
  return (
    <Stack
      direction={"row"}
      gap={2}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <ShowRating show={show} />
      <TvMetaSeasonEpisodes show={show} />
    </Stack>
  );
};
const TvMetaSeasonEpisodes = ({ show }: { show: TvShow }) => {
  const countEpisodes = (seasons?: Season[]) => {
    let total = 0;
    seasons &&
      seasons.forEach((season) => {
        total += season?.episodeCount ?? 0;
      });
    return total;
  };
  const episodeCount = countEpisodes(show?.seasons);
  if (episodeCount < 1) return null;
  return (
    <Stack direction={"row"} gap={2}>
      <Typography variant="caption" color="text.secondary">
        Seasons: {show.seasons?.length}
      </Typography>

      <Typography variant="caption" color="text.secondary">
        Episodes: {episodeCount}
      </Typography>
    </Stack>
  );
};
const MovieMeta = ({ show }: { show: Movie }) => {
  const year = fLeft(show.releaseDate, "-");
  return (
    <Stack
      direction={"row"}
      gap={2}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <ShowRating show={show} />

      <Typography variant="caption" color="text.secondary">
        Released: {year}
      </Typography>
    </Stack>
  );
};
const ShowRating = ({ show }: { show: Movie | TvShow }) => {
  const rating = (show.voteAverage ?? 0) / 2;
  return (
    <Rating
      name="read-only"
      value={rating}
      readOnly
      precision={0.25}
      size="small"
    />
  );
};
