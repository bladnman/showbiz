import { useMemo } from "react";
import { getAllShowTypes } from "../store/utils/itemUtils";
import { ShowbizItem } from "../@types";

export default function useShowTypes(shows: ShowbizItem[]) {
  return useMemo(() => {
    return getAllShowTypes(shows);
  }, [shows]);
}
