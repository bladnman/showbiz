import { CustomDataItem } from "@types";
import { fire_saveCustomData } from "@services/firestore/utils/fire_utils";
import markCustomDataListAsChanged from "@custom-data-utils/markCustomDataListAsChanged";
import getAllCustomDataList from "./getAllCustomDataList";

export default async function finalSaveCustomData(
  customData: CustomDataItem | null
) {
  if (!customData) return;

  // we will clone this item so that updates are rendered
  const newCustomDataItem = { ...customData };

  // update the cloud
  await fire_saveCustomData(newCustomDataItem);

  // update our custom data list
  // by removing the old item and adding the new one
  const allCustomDataList = getAllCustomDataList();
  const index = allCustomDataList.findIndex(
    (item) => item.id === newCustomDataItem.id
  );
  if (index > -1) allCustomDataList.splice(index, 1);
  allCustomDataList.push(newCustomDataItem);

  markCustomDataListAsChanged();
}
