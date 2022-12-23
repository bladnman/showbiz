import { CustomDataItem } from "@types";
import dayjs from "dayjs";
import { dateFromTimestamp } from "@utils/helpers";

export default function getShowHoldUntilDateDesc(
  showCustomData?: CustomDataItem
): string | null {
  if (!showCustomData || !showCustomData?.holdUntilDate) {
    return null;
  }
  return dayjs(dateFromTimestamp(showCustomData.holdUntilDate)).format(
    "MMM D, YYYY"
  );
}
