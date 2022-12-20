import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { CustomDataItem, ShowbizItem } from "@types";
import { getCustomDataForShow } from "@utils/customDataUtils";
import { fireDb, showsCollection, customDataCollection } from "../firestore";
import {
  FIRE_CUSTOM_DATA_COLLECTION_NAME,
  FIRE_SHOWS_COLLECTION_NAME,
} from "../fire_const";
import { CLOUD_SAVE_ENABLED } from "@CONST";

export async function fire_saveShow(show: ShowbizItem) {
  // see if the show exists already
  const cloudShowDoc = await fire_getShowDocument(show);

  // is fire-save enabled
  if (!CLOUD_SAVE_ENABLED) {
    console.log(`[🐽](fire_utils) [skipped] SAVING show`, show);
    return;
  }

  // update
  if (cloudShowDoc) {
    await setDoc(cloudShowDoc, show);
  }

  // save new
  else {
    // new show, needs new custom data
    const customData = getCustomDataForShow(show);
    if (!customData) return;

    await fire_saveCustomData(customData);
    // and save the show
    addDoc(showsCollection, show).catch((e) =>
      console.error("Error adding show: ", e)
    );
  }
}

export async function fire_saveCustomData(customData: CustomDataItem) {
  if (!CLOUD_SAVE_ENABLED) {
    console.log(`[🐽](fire_utils) [skipped] SAVING customData`, customData);
    return;
  }

  if (!customData) return;

  customData.editedDate = Timestamp.fromDate(new Date());

  // find, if exists already
  const cloudCustomDataDoc = await fire_getCustomDataDocument(customData);

  // update
  if (cloudCustomDataDoc) {
    await setDoc(cloudCustomDataDoc, customData);
  }

  // save new
  else {
    addDoc(customDataCollection, customData).catch((e) =>
      console.error("Error adding custom data: ", e)
    );
  }
}

export async function fire_deleteShow(show: ShowbizItem) {
  // find show in collection
  const q = query(showsCollection, where("id", "==", show.id));
  const querySnapshotList = await getDocs(q);

  // not found
  if (!querySnapshotList) {
    console.error("Show was not found to be saved.");
    return;
  }

  const deletePromises = <any>[];
  querySnapshotList.forEach((snapDoc) => {
    deletePromises.push(
      deleteDoc(doc(fireDb, FIRE_SHOWS_COLLECTION_NAME, snapDoc.id))
    );
  });
  await Promise.all(deletePromises);
}

export async function fire_deleteCustomDataDocumentById(docId: string) {
  return deleteDoc(doc(fireDb, FIRE_CUSTOM_DATA_COLLECTION_NAME, docId));
}

export async function fire_getShowDocument(show: ShowbizItem) {
  // find show in collection
  const q = query(showsCollection, where("id", "==", show.id));
  const querySnapshotList = await getDocs(q);

  // not found
  if (!querySnapshotList) return null;

  const snapDoc = querySnapshotList.docs[0];
  return fire_getShowDocumentWithDocId(snapDoc?.id);
}

export async function fire_getCustomDataDocument(customData: CustomDataItem) {
  const ids = await fire_getCustomDataDocumentIdList(customData.id);
  if (ids.length < 1) return null;
  return fire_getCustomDataDocumentWithDocId(ids[0]);
}

export async function fire_getCustomDataDocumentIdList(id: number) {
  // find doc in collection
  const q = query(customDataCollection, where("id", "==", id));
  const querySnapshotList = await getDocs(q);

  // not found
  if (!querySnapshotList) return [];

  return querySnapshotList.docs.map((doc) => doc.id);
}

export function fire_getShowDocumentWithDocId(docId: string) {
  if (!docId) return null;
  try {
    return doc(fireDb, FIRE_SHOWS_COLLECTION_NAME, docId);
  } catch (e) {
    return null;
  }
}

export function fire_getCustomDataDocumentWithDocId(docId: string) {
  if (!docId) return null;
  try {
    return doc(fireDb, FIRE_CUSTOM_DATA_COLLECTION_NAME, docId);
  } catch (e) {
    return null;
  }
}

export async function fire_fetchSavedShows() {
  const querySnapshot = await getDocs(showsCollection);
  const shows: ShowbizItem[] = [];

  querySnapshot.forEach((doc) => {
    shows.push(doc.data() as ShowbizItem);
  });
  return shows;
}

export async function fire_fetchCustomDataList() {
  const querySnapshot = await getDocs(customDataCollection);
  const customDataList: CustomDataItem[] = [];

  querySnapshot.forEach((doc) => {
    customDataList.push(doc.data() as CustomDataItem);
  });
  return customDataList;
}
