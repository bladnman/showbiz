import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";
import finalSaveCustomData from "@custom-data-utils/finalSaveCustomData";
import { Timestamp } from "firebase/firestore";

export default async function setHoldUntilForShow(
  show: ShowbizItem | null,
  date: Date | null
) {
  const customData = getCustomDataForShow(show);
  if (!customData) return undefined;

  customData.holdUntilDate = date ? Timestamp.fromDate(date) : undefined;
  await finalSaveCustomData(customData);
}
