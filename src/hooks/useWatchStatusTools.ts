import { useMemo } from "react";
import {
  setWatchStatus,
  getAllWatchStatuses,
  getAllWatchStatusesForShows,
  showContainsWatchStatus,
  getWatchStatus,
} from "@utils/watchStatusUtils";
import useActiveCustomDataList from "./useActiveCustomDataList";

export default function useWatchStatusTools() {
  const customDataList = useActiveCustomDataList();
  const watchStatuses = useMemo(() => {
    return getAllWatchStatuses(customDataList);
  }, [customDataList]);
  return useMemo(
    () => ({
      watchStatuses,
      setWatchStatus,
      getWatchStatus,
      showContainsWatchStatus,
      getAllWatchStatusesForShows,
    }),
    [watchStatuses]
  );
}
