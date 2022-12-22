import { ShowbizItem } from "@types";
import getCustomDataListForShows from "@custom-data-utils/getCustomDataListForShows";
import { sortAlphaNumeric } from "@utils/helpers";

export default function getAllCollectionsForShows(
  shows: ShowbizItem[]
): string[] {
  const customDataList = getCustomDataListForShows(shows);
  if (!customDataList || customDataList.length === 0) return [];
  const set = new Set<string>();
  customDataList.forEach(
    (item) =>
      item.collections &&
      item.collections.forEach((collection) => set.add(collection))
  );
  return Array.from(set).sort(sortAlphaNumeric);
}
