import { FilterDef, ShowbizItem } from "@types";
import { useFilter } from "./useFilter";
import { useMemo } from "react";
import getAllCollectionsForShows from "@collection-utils/getAllCollectionsForShows";
import showContainsCollection from "@collection-utils/showContainsCollection";

export function useCollectionsFilter(
  shows: ShowbizItem[],
  collections: string[]
): FilterDef {
  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return showContainsCollection(show, filterValue);
  };

  const showCollectionValues = useMemo(() => {
    return getAllCollectionsForShows(shows);
  }, [shows, collections]);

  return useFilter({
    title: "Collections",
    filterValues: showCollectionValues,
    filterFn,
    defaultExpanded: true,
    areValuesEditable: true,
  });
}
