import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";
import finalSaveCustomData from "@custom-data-utils/finalSaveCustomData";

export default async function setWatchStatus(
  show: ShowbizItem | null,
  value: string
) {
  const customData = getCustomDataForShow(show);
  if (!customData) return undefined;

  customData.watchStatus = value;

  // clear any hold date
  if (customData.watchStatus !== "hold") {
    delete customData.holdUntilDate;
  }
  await finalSaveCustomData(customData);
}
