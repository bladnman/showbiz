import { ShowbizItem } from "@types";
import getWatchStatus from "@watch-status-utils/getWatchStatus";

export default function showContainsWatchStatus(
  show: ShowbizItem,
  value: string
): boolean {
  return getWatchStatus(show) === value;
}
