import { ShowbizItem } from "@types";
import { showHoldDateComparator } from "@utils/helpers";

export default function sortShowsByHoldDate(shows?: ShowbizItem[] | null) {
  if (!shows) return [];
  return shows.sort(showHoldDateComparator);
}
