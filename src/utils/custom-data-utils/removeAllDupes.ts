import getDuplicateItemIds from "@custom-data-utils/getDuplicateItemIds";
import {
  fire_deleteCustomDataDocumentById,
  fire_getCustomDataDocumentIdList,
} from "@services/firestore/utils/fire_utils";
import checkForCustomDataDuplicates from "@custom-data-utils/checkForCustomDataDuplicates";

/**
 * This is a house-cleaning function that should never have to be called.
 * It is here in case there are any duplicate items in the custom data list.
 * At this point we will call it through a custom dev command.
 */
let _dedupe_called = false;
const REALLY_DELETE = true;

export default async function removeAllDupes() {
  if (_dedupe_called) return;
  _dedupe_called = true;

  if (!REALLY_DELETE) {
    console.warn(
      "REALLY_DELETE is false, not deleting anything. Visit utils function to change this."
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
