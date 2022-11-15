import { Box } from "@mui/material";
import { useCallback, useRef } from "react";
import { Movie, Person, Tv } from "../../TMDB/types";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import TvCard from "./TvCard";
import { CardProps } from "./types";

export default function TopCard({
  item,
  onClick,
  height,
  expanded = false,
}: CardProps) {
  const handleClick = useRef(() => {
    console.log(`🐽 [TopCard] item`, item);

    onClick && onClick(item);
  }).current;

  const renderCard = useCallback(() => {
    if (item.isMovie)
      return (
        <MovieCard item={item as Movie} expanded={expanded} height={height} />
      );
    if (item.isTv)
      return <TvCard item={item as Tv} expanded={expanded} height={height} />;
    if (item.isPerson)
      return (
        <PersonCard item={item as Person} expanded={expanded} height={height} />
      );
    return null;
  }, [item]);

  if (!item) return null;
  return <Box onClick={handleClick}>{renderCard()}</Box>;
}
