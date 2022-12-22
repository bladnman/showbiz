import { ShowbizItem } from "@types";
import getAllCollectionsForShows from "@collection-utils/getAllCollectionsForShows";
import { sortAlphaNumeric } from "@utils/helpers";

export default function getCollectionsForShow(
  show: ShowbizItem | null
): string[] {
  if (!show) return [];
  return getAllCollectionsForShows([show]).sort(sortAlphaNumeric);
}
