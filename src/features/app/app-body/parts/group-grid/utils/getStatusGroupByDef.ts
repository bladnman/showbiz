import { CustomDataItem, GroupByDef, ShowbizItem } from "@types";
import getAllWatchStatusesForShows from "@watch-status-utils/getAllWatchStatusesForShows";
import showContainsWatchStatus from "@watch-status-utils/showContainsWatchStatus";

export default function getStatusGroupByDef({
  shows,
}: {
  customDataList: CustomDataItem[];
  shows: ShowbizItem[];
}): GroupByDef {
  const groupValues = getAllWatchStatusesForShows(shows);
  const showGroups = groupValues.map((groupValue) => {
    const matchingShows =
      shows.filter((show) => showContainsWatchStatus(show, groupValue)) ?? [];
    return {
      title: groupValue,
      shows: matchingShows,
    };
  });

  return {
    title: "Status",
    showGroups,
  };
}
