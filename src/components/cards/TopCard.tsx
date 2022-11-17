import { Box } from "@mui/material";
import { useCallback, useRef } from "react";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import TvCard from "./TvCard";
import { CardProps } from "./types";

export default function TopCard({
  item,
  onClick,
  height,
  expanded = false,
  maxDescLines = 3,
}: CardProps) {
  const handleClick = useRef(() => {
    console.log(`🐽 [TopCard] item`, item);

    onClick && onClick(item);
  }).current;

  const renderCard = useCallback(() => {
    if (item.isMovie)
      return (
        <MovieCard
          item={item}
          expanded={expanded}
          height={height}
          maxDescLines={maxDescLines}
        />
      );
    if (item.isTv)
      return (
        <TvCard
          item={item}
          expanded={expanded}
          height={height}
          maxDescLines={maxDescLines}
        />
      );
    if (item.isPerson)
      return (
        <PersonCard
          item={item}
          expanded={expanded}
          height={height}
          maxDescLines={maxDescLines}
        />
      );
    return null;
  }, [item]);

  if (!item) return null;
  return <Box onClick={handleClick}>{renderCard()}</Box>;
}
