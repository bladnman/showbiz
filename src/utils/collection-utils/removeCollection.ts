import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";
import finalSaveCustomData from "@custom-data-utils/finalSaveCustomData";

export default async function removeCollection(
  show: ShowbizItem,
  collectionName: string,
  doCloudSave = true
) {
  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  set.delete(collectionName.toLowerCase());
  customData.collections = Array.from(set).sort();
  doCloudSave && (await finalSaveCustomData(customData));
}
