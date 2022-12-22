import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";
import finalSaveCustomData from "@custom-data-utils/finalSaveCustomData";
import addShow from "@show-utils/addShow";

export default async function addCollection(
  show: ShowbizItem,
  collectionName: string,
  doCloudSave = true
) {
  // this needs to be a show before it gets collections
  await addShow(show);

  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  set.add(collectionName.toLowerCase());
  customData.collections = Array.from(set).sort();
  doCloudSave && (await finalSaveCustomData(customData));
}
