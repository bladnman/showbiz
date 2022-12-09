import { useMemo } from "react";
import { getAllGenres } from "../store/utils/itemUtils";
import { ShowbizItem } from "../@types";

export default function useGenres(shows: ShowbizItem[]) {
  return useMemo(() => {
    return getAllGenres(shows);
  }, [shows]);
}
