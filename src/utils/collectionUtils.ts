import { CustomDataItem, ShowbizItem } from "../@types";
import {
  finalSaveCustomData,
  getCustomDataForShow,
  getCustomDataListForShows,
} from "./customDataUtils";

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

export function showContainsCollection(
  show: ShowbizItem,
  collection: string
): boolean {
  return getCustomDataForShow(show).collections.includes(collection);
}

export function addCollection(show: ShowbizItem, collectionName: string) {
  const customData = getCustomDataForShow(show);
  const set = new Set<string>(customData.collections);
  set.add(collectionName.toLowerCase());
  customData.collections = Array.from(set).sort();
  finalSaveCustomData(customData);
}

export function removeCollection(show: ShowbizItem, collectionName: string) {
  const customData = getCustomDataForShow(show);
  const set = new Set<string>(customData.collections);
  set.delete(collectionName.toLowerCase());
  customData.collections = Array.from(set).sort();
  finalSaveCustomData(customData);
}

export function toggleCollection(show: ShowbizItem, collectionName: string) {
  const customData = getCustomDataForShow(show);
  const set = new Set<string>(customData.collections);
  if (set.has(collectionName.toLowerCase())) {
    removeCollection(show, collectionName);
  } else {
    addCollection(show, collectionName);
  }
}
