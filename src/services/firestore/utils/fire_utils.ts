import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ShowbizItem } from "../../TMDB/utils/convertToItem";
import { fireDb, showsCollection } from "../firestore";
import { FIRE_SHOWS_COLLECTION_NAME } from "../fire_const";

export function saveShowToCloud(show: ShowbizItem) {
  addDoc(showsCollection, show).catch((e) =>
    console.error("Error adding show: ", e)
  );
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

  // bail - multiple found
  if (querySnapshotList.size > 1) {
    console.error(
      "There are multiple items with this id. Something is wrong!",
      querySnapshotList
    );
    return;
  }

  // one found!
  let docIdToDelete;
  querySnapshotList.forEach((doc) => {
    docIdToDelete = doc.id;
  });

  // remove that item
  if (docIdToDelete) {
    await deleteDoc(doc(fireDb, FIRE_SHOWS_COLLECTION_NAME, docIdToDelete));
  }
}

export async function fetchSavedShows() {
  const querySnapshot = await getDocs(showsCollection);
  const shows: ShowbizItem[] = [];

  querySnapshot.forEach((doc) => {
    shows.push(doc.data() as ShowbizItem);
    console.log(doc.id, " => ", doc.data().name);
  });
  return shows;
}
