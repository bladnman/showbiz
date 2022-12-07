import { useMemo } from "react";
import { getAllCollections, getShowFromList } from "../store/utils/itemUtils";
import useShows from "./useShows";
import { ShowbizItem } from "../@types";

export default function useCollectionsFromShow(show: ShowbizItem) {
  const shows = useShows();
  const collections = useMemo(() => {
    if (show.collections.length) return show.collections;
    return getShowFromList(show, shows);
  }, [shows, show]);
  return collections;
}
