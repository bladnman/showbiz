import { ShowbizItem } from "@types";
import getAllWatchStatuses from "@watch-status-utils/getAllWatchStatuses";
import getCustomDataListForShows from "@custom-data-utils/getCustomDataListForShows";
import sortAccordingToConstant from "@watch-status-utils/sortAccordingToConstant";

export default function getAllWatchStatusesForShows(
  shows: ShowbizItem[]
): string[] {
  return sortAccordingToConstant(
    getAllWatchStatuses(getCustomDataListForShows(shows))
  );
}
