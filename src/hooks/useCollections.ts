import { useMemo } from "react";
import { getAllCollections } from "../store/utils/itemUtils";
import useShows from "./useShows";

export default function useCollections() {
  const shows = useShows();
  const collections = useMemo(() => {
    return getAllCollections(shows);
  }, [shows]);
  return collections;
}
