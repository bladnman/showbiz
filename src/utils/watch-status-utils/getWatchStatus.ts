import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";

export default function getWatchStatus(
  show: ShowbizItem | null
): string | undefined {
  if (!show) return undefined;
  return getCustomDataForShow(show)?.watchStatus;
}
