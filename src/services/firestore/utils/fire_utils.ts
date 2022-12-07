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
import { ShowbizItem } from "../../../@types";
import { fireDb, showsCollection } from "../firestore";
import { FIRE_SHOWS_COLLECTION_NAME } from "../fire_const";

export async function saveShowToCloud(show: ShowbizItem) {
  // see if the show exists already
  const cloudShowDoc = await getShowDocumentFromCloud(show);

  // update
  if (cloudShowDoc) {
    await setDoc(cloudShowDoc, show);
  }

  // save new
  else {
    addDoc(showsCollection, show).catch((e) =>
      console.error("Error adding show: ", e)
    );
  }
}

export async function deleteShowFromCloud(show: ShowbizItem) {
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

export async function getShowDocumentFromCloud(show: ShowbizItem) {
  // find show in collection
  const q = query(showsCollection, where("id", "==", show.id));
  const querySnapshotList = await getDocs(q);

  // not found
  if (!querySnapshotList) return null;

  const snapDoc = querySnapshotList.docs[0];
  return getShowDocumentFromCloudWithDocId(snapDoc?.id);
}

export function getShowDocumentFromCloudWithDocId(docId: string) {
  if (!docId) return null;
  try {
    return doc(fireDb, FIRE_SHOWS_COLLECTION_NAME, docId);
  } catch (e) {
    return null;
  }
}

export async function fetchSavedShows() {
  const querySnapshot = await getDocs(showsCollection);
  const shows: ShowbizItem[] = [];

  querySnapshot.forEach((doc) => {
    shows.push(doc.data() as ShowbizItem);
  });
  return shows;
}
