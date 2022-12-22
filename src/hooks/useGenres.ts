import { useMemo } from "react";
import { ShowbizItem } from "../@types";
import getAllGenres from "@show-utils/getAllGenres";

export default function useGenres(shows: ShowbizItem[]) {
  return useMemo(() => {
    return getAllGenres(shows);
  }, [shows]);
}
