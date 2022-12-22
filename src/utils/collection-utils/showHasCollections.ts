import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";

export default function showHasCollections(show: ShowbizItem | null): boolean {
  const customData = getCustomDataForShow(show);
  if (!customData) return false;
  return customData.collections.length > 0;
}
