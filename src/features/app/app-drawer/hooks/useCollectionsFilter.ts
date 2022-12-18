import { FilterDef, ShowbizItem } from "@types";
import { useFilter } from "./useFilter";
import {
  getAllCollectionsForShows,
  showContainsCollection,
} from "@utils/collectionUtils";
import { useMemo } from "react";

export function useCollectionsFilter(
  shows: ShowbizItem[],
  collections: string[]
): FilterDef {
  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return showContainsCollection(show, filterValue);
  };

  const showsCollections = useMemo(() => {
    return getAllCollectionsForShows(shows);
  }, [shows, collections]);

  return useFilter({
    title: "Collections",
    items: showsCollections,
    filterFn,
    defaultExpanded: true,
  });
}
