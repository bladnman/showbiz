import { ShowbizItem } from "@types";
import getShowFromList from "@show-utils/getShowFromList";

export default function isShowInList(
  show: ShowbizItem | null | undefined,
  shows: ShowbizItem[]
) {
  if (!show) return false;
  return !!getShowFromList(show, shows);
}
