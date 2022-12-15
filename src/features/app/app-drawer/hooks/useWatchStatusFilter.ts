import { Filter, ShowbizItem } from "@types";
import { useFilter } from "./useFilter";
import { useMemo } from "react";
import useWatchStatusTools from "@/hooks/useWatchStatusTools";

export function useWatchStatusFilter(shows: ShowbizItem[]): Filter {
  const { getAllWatchStatusesForShows, showContainsWatchStatus } =
    useWatchStatusTools();
  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return showContainsWatchStatus(show, filterValue);
  };

  const showsWatchStatuses = useMemo(() => {
    return getAllWatchStatusesForShows(shows);
  }, [shows, getAllWatchStatusesForShows]);

  return useFilter({
    title: "Status",
    items: showsWatchStatuses,
    filterFn,
  });
}
