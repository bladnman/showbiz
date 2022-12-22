import { ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";
import removeCollection from "@collection-utils/removeCollection";
import addCollectionToShow from "@collection-utils/addCollectionToShow";

export default async function toggleCollection(
  show: ShowbizItem,
  collectionName: string,
  doCloudSave = true
) {
  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  if (set.has(collectionName.toLowerCase())) {
    await removeCollection(show, collectionName, doCloudSave);
  } else {
    await addCollectionToShow(show, collectionName, doCloudSave);
  }
}
