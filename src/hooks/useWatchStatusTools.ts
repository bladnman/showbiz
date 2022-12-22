import { useMemo } from "react";
import useActiveCustomDataList from "./useActiveCustomDataList";
import getAllWatchStatuses from "@watch-status-utils/getAllWatchStatuses";
import getAllWatchStatusesForShows from "@watch-status-utils/getAllWatchStatusesForShows";
import getWatchStatus from "@watch-status-utils/getWatchStatus";
import showContainsWatchStatus from "@watch-status-utils/showContainsWatchStatus";
import setWatchStatus from "@watch-status-utils/setWatchStatus";

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
