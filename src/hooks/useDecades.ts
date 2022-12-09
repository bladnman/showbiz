import { useMemo } from "react";
import { getAllDecades, getAllGenres } from "../store/utils/itemUtils";
import useShowTools from "./useShowTools";

export default function useDecades() {
  const { shows } = useShowTools();

  return useMemo(() => {
    return getAllDecades(shows);
  }, [shows]);
}
