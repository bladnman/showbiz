import { Box } from "@mui/material";
import { useCallback } from "react";
import { Movie, Person, TvShow } from "../../TMDB/types";
import {
  isMovieType,
  isPersonType,
  isTvShowType,
} from "../../TMDB/utils/duckTyping";
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
