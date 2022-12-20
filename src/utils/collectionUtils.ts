import { CustomDataItem, ShowbizItem } from "@types";
import {
  finalSaveCustomData,
  getAllCustomDataList,
  getCustomDataForShow,
  getCustomDataListForShows,
} from "./customDataUtils";
import { addShow } from "@utils/itemUtils";
import useMegaStore from "@store/MegaStore";

export function getAllCollections(customDataList: CustomDataItem[]): string[] {
  if (!customDataList || customDataList.length === 0) return [];
  const set = new Set<string>();
  customDataList.forEach(
    (item) =>
      item.collections &&
      item.collections.forEach((collection) => set.add(collection))
  );
  return Array.from(set).sort();
}

export function getAllCollectionsForShows(shows: ShowbizItem[]): string[] {
  const customDataList = getCustomDataListForShows(shows);
  if (!customDataList || customDataList.length === 0) return [];
  const set = new Set<string>();
  customDataList.forEach(
    (item) =>
      item.collections &&
      item.collections.forEach((collection) => set.add(collection))
  );
  return Array.from(set).sort();
}

export function getCollectionsForShow(show: ShowbizItem | null): string[] {
  if (!show) return [];
  return getAllCollectionsForShows([show]);
}

export function showContainsCollection(
  show: ShowbizItem | null,
  collection: string
): boolean {
  const customData = getCustomDataForShow(show);
  if (!customData) return false;

  return customData.collections.includes(collection);
}

export function addCollection(
  show: ShowbizItem,
  collectionName: string,
  doCloudSave = true
) {
  // this needs to be a show before it gets collections
  addShow(show);

  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  set.add(collectionName.toLowerCase());
  customData.collections = Array.from(set).sort();
  doCloudSave && finalSaveCustomData(customData);
}

export function removeCollection(
  show: ShowbizItem,
  collectionName: string,
  doCloudSave = true
) {
  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  set.delete(collectionName.toLowerCase());
  customData.collections = Array.from(set).sort();
  doCloudSave && finalSaveCustomData(customData);
}

export function toggleCollection(
  show: ShowbizItem,
  collectionName: string,
  doCloudSave = true
) {
  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  if (set.has(collectionName.toLowerCase())) {
    removeCollection(show, collectionName, doCloudSave);
  } else {
    addCollection(show, collectionName, doCloudSave);
  }
}

export function renameCollection(
  oldCollectionName: string,
  newCollectionName: string,
  doCloudSave = true
) {
  // we need to go through ALL custom data
  const customDataList = getAllCustomDataList(); // we do really need ALL (including non-active)

  customDataList.forEach((customData) => {
    const set = new Set<string>(customData.collections);
    if (set.has(oldCollectionName.toLowerCase())) {
      set.delete(oldCollectionName.toLowerCase());
      set.add(newCollectionName.toLowerCase());
      customData.collections = Array.from(set).sort();
      doCloudSave && finalSaveCustomData(customData);
    }
  });
}

export function setCollectionToRename(collectionName: string) {
  useMegaStore.setState({ collectionToRename: collectionName });
}

export function clearCollectionToRename() {
  useMegaStore.setState({ collectionToRename: null });
}
