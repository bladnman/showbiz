import { Box } from "@mui/material";
import { useCallback, useRef } from "react";
import { Movie, Person, Tv } from "../../TMDB/types";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import TvCard from "./TvCard";

export default function TopCard({
  item,
  onClick,
}: {
  item: Movie | Tv | Person;
  onClick?: (item: Movie | Tv | Person) => void;
}) {
  const handleClick = useRef(() => {
    console.log(`🐽 [TopCard] item`, item);

    onClick && onClick(item);
  }).current;

  const renderCard = useCallback(() => {
    if (item.isMovie) return <MovieCard show={item as Movie} />;
    if (item.isTv) return <TvCard show={item as Tv} />;
    if (item.isPerson) return <PersonCard person={item as Person} />;
    return null;
  }, [item]);

  if (!item) return null;
  return <Box onClick={handleClick}>{renderCard()}</Box>;
}
