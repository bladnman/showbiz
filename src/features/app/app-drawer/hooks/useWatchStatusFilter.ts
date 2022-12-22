import { CustomDataItem, FilterDef, ShowbizItem } from "@types";
import { useFilter } from "./useFilter";
import { useMemo } from "react";
import useWatchStatusTools from "@/hooks/useWatchStatusTools";
import { sortAccordingToConstant } from "@utils/watchStatusUtils";

export function useWatchStatusFilter(
  shows: ShowbizItem[],
  customDataList: CustomDataItem[]
): FilterDef {
  const { getAllWatchStatusesForShows, showContainsWatchStatus } =
    useWatchStatusTools();
  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return showContainsWatchStatus(show, filterValue);
  };

  const showsWatchStatuses = useMemo(() => {
    return sortAccordingToConstant(getAllWatchStatusesForShows(shows));
  }, [shows, getAllWatchStatusesForShows, customDataList]);

  return useFilter({
    title: "Status",
    filterValues: showsWatchStatuses,
    filterFn,
  });
}
