import { CustomDataItem, ShowbizItem } from "@types";
import {
  fire_deleteCustomDataDocumentById,
  fire_getCustomDataDocumentIdList,
  fire_saveCustomData,
} from "@services/firestore/utils/fire_utils";
import useMegaStore from "../store/MegaStore";
import { deleteDoc, doc, Timestamp } from "firebase/firestore";
import { fireDb } from "@services/firestore/firestore";
import { FIRE_SHOWS_COLLECTION_NAME } from "@services/firestore/fire_const";

export function getCustomDataForShow(
  show: ShowbizItem | null
): CustomDataItem | null {
  if (!show) return null;

  const customDataList = getAllCustomDataList();

  const customDataItem = customDataList.find((item) => item.id === show.id);
  if (customDataItem) return customDataItem;

  // new item, if not found
  return {
    id: show.id,
    name: show.name,
    watchStatus: "new",
    collections: [],
    createdDate: show.lastHydrationDate ?? Timestamp.fromDate(new Date()),
    editedDate: show.lastHydrationDate ?? Timestamp.fromDate(new Date()),
  };
}

export function addCustomDataForShow(show: ShowbizItem | null) {
  if (!show) return;

  const customDataList = getAllCustomDataList();

  const storeItem = customDataList.find((item) => item.id === show.id);

  // already have custom data for this show
  if (storeItem) return;

  // new item, if not found
  const newData = {
    id: show.id,
    name: show.name,
    watchStatus: "new",
    collections: [],
    createdDate: show.lastHydrationDate ?? Timestamp.fromDate(new Date()),
    editedDate: show.lastHydrationDate ?? Timestamp.fromDate(new Date()),
  };

  customDataList.push(newData);

  finalSaveCustomData(newData);
}

export function getCustomDataListForShows(shows: ShowbizItem[]) {
  if (!shows) return [];
  const customDataList = getAllCustomDataList();
  return customDataList.filter((item) =>
    shows.find((show) => show.id === item.id)
  );
}

export function getAllCustomDataList() {
  return useMegaStore.getState().customDataList;
}

export function markCustomDataListAsChanged() {
  const customDataList = getAllCustomDataList();
  useMegaStore.setState({
    customDataList: [...customDataList],
  });
}

export function finalSaveCustomData(customData: CustomDataItem | null) {
  if (!customData) return;
  fire_saveCustomData(customData).catch();
  markCustomDataListAsChanged();
}

export function getDuplicateItemIds(): Set<number> {
  const customDataList = getAllCustomDataList();
  const duplicateItems = customDataList.filter(
    (customData) => countOccurrencesOfItem(customData) > 1
  );
  const idSet = new Set<number>();
  duplicateItems.forEach((item) => idSet.add(item.id));
  return idSet;
}

export function getCustomDataListById(id: number) {
  const customDataList = getAllCustomDataList();
  return customDataList.filter((item) => item.id === id);
}

export function countOccurrencesOfItem(customData: CustomDataItem) {
  const customDataList = getAllCustomDataList();
  return customDataList.filter((item) => item.id === customData.id).length;
}

export function getOccurrencesOfDataForId(id: number) {
  return getAllCustomDataList().filter((item) => item.id === id);
}

/**
 * This is a house-cleaning function that should never have to be called.
 * It is here in case there are any duplicate items in the custom data list.
 * At this point we will call it through a custom dev command.
 */
let _dedupe_called = false;
const REALLY_DELETE = false;

export async function removeAllDupes() {
  if (_dedupe_called) return;
  _dedupe_called = true;

  if (!REALLY_DELETE) {
    console.warn(
      "REALLY_DELETE is false, not deleting anything. Visit customDataUtils.ts to change this."
    );
    return;
  }

  checkForCustomDataDuplicates();

  const dupeIds = getDuplicateItemIds();
  const getDocIdPromises = <any>[];
  dupeIds.forEach((dupeId) => {
    getDocIdPromises.push(fire_getCustomDataDocumentIdList(dupeId));
  });
  const allDocIdsList = await Promise.all(getDocIdPromises);

  const deletePromises = <any>[];
  allDocIdsList.forEach((docIdList) => {
    docIdList.forEach((docId: string, index: number) => {
      if (index === 0) return;
      deletePromises.push(fire_deleteCustomDataDocumentById(docId));
    });
  });
  await Promise.all(deletePromises);
  console.log(`[🐽](customDataUtils) all deleted`);
}

let _dedupe_check_called = false;

export function checkForCustomDataDuplicates() {
  if (_dedupe_check_called) return;
  _dedupe_check_called = true;
  const dupeIds = getDuplicateItemIds();
  if (dupeIds.size > 0) {
    console.warn(
      `There are ${dupeIds.size} duplicate items in the custom data list.`
    );
    console.log(dupeIds);
  }
}
