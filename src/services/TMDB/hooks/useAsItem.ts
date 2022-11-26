import { useMemo } from "react";
import { Movie, Tv, Person } from "../types";
import convertToItem from "../utils/convertToItem";

export default function useAsItem(
  tmdbObject: Movie | Tv | Person | null | undefined
) {
  const item = useMemo(() => convertToItem(tmdbObject), [tmdbObject]);

  return item;
}
