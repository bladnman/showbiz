import { ShowbizItem } from "@types";
import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";

export default function getCustomDataListForShows(shows: ShowbizItem[]) {
  if (!shows) return [];
  const customDataList = getAllCustomDataList();
  return customDataList.filter((item) =>
    shows.find((show) => show.id === item.id)
  );
}
