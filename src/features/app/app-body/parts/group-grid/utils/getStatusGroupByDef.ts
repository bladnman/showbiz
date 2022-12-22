import { showHasCollections } from "@/utils/collectionUtils";
import { CustomDataItem, GroupByDef, ShowbizItem } from "@types";
import {
  getAllWatchStatusesForShows,
  showContainsWatchStatus,
} from "@utils/watchStatusUtils";

export default function getStatusGroupByDef({
  customDataList,
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
