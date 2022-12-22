import { useMemo } from "react";
import { ShowbizItem } from "../@types";
import getAllDecades from "@show-utils/getAllDecades";

export default function useDecades(shows: ShowbizItem[]) {
  return useMemo(() => {
    return getAllDecades(shows);
  }, [shows]);
}
