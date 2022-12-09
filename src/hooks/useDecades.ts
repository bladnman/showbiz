import { useMemo } from "react";
import { getAllDecades } from "../store/utils/itemUtils";
import { ShowbizItem } from "../@types";

export default function useDecades(shows: ShowbizItem[]) {
  return useMemo(() => {
    return getAllDecades(shows);
  }, [shows]);
}
