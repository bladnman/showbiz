import { CustomDataItem, ShowbizItem } from "@types";
import {
  finalSaveCustomData,
  getCustomDataForShow,
  getCustomDataListForShows,
} from "./customDataUtils";
import { addShow } from "@utils/itemUtils";

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

export function addCollection(show: ShowbizItem, collectionName: string) {
  // this needs to be a show before it gets collections
  addShow(show);

  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  set.add(collectionName.toLowerCase());
  customData.collections = Array.from(set).sort();
  finalSaveCustomData(customData);
}

export function removeCollection(show: ShowbizItem, collectionName: string) {
  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  set.delete(collectionName.toLowerCase());
  customData.collections = Array.from(set).sort();
  finalSaveCustomData(customData);
}

export function toggleCollection(show: ShowbizItem, collectionName: string) {
  const customData = getCustomDataForShow(show);
  if (!customData) return;

  const set = new Set<string>(customData.collections);
  if (set.has(collectionName.toLowerCase())) {
    removeCollection(show, collectionName);
  } else {
    addCollection(show, collectionName);
  }
}
