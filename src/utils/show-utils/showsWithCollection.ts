import { ShowbizItem } from "@types";
import showContainsCollection from "@collection-utils/showContainsCollection";

export default function showsWithCollection(
  shows: ShowbizItem[],
  value: string
) {
  return shows?.filter((show) => showContainsCollection(show, value)) ?? [];
}
