import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";

export default function showContainsCollection(
  show: ShowbizItem | null,
  collection: string
): boolean {
  const customData = getCustomDataForShow(show);
  if (!customData) return false;

  return customData.collections.includes(collection);
}
