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
  await finalSaveCustomData(customData);
}
