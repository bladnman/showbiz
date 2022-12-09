import { useMemo } from "react";
import { getAllCollections } from "../store/utils/itemUtils";
import { ShowbizItem } from "../@types";

export default function useCollections(shows: ShowbizItem[]) {
  return useMemo(() => {
    return getAllCollections(shows);
  }, [shows]);
}
