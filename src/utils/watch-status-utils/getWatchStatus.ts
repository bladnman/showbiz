import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";

export default function getWatchStatus(
  show: ShowbizItem | null,
  includeHoldUntil = false
): string | undefined {
  if (!show) return undefined;
  const customData = getCustomDataForShow(show);
  if (!customData) return undefined;

  const watchStatus = customData.watchStatus;
  const holdUntilDate = customData.holdUntilDate;

  if (includeHoldUntil && watchStatus === "hold" && holdUntilDate) {
    return `Hold : ${holdUntilDate.toDate().toLocaleDateString()}`;
  }
  return getCustomDataForShow(show)?.watchStatus;
}
