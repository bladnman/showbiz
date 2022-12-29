import { ShowbizItem } from "@types";
import { showRatingComparator } from "@utils/helpers";

export default function sortShowsByRating(shows?: ShowbizItem[] | null) {
  if (!shows) return [];
  return shows.sort(showRatingComparator);
}
