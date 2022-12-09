import { useMemo } from "react";
import { getAllGenres } from "../store/utils/itemUtils";
import useShowTools from "./useShowTools";

export default function useGenres() {
  const { shows } = useShowTools();

  return useMemo(() => {
    return getAllGenres(shows);
  }, [shows]);
}
