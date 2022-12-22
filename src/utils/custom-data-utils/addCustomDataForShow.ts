import { ShowbizItem } from "@types";
import { Timestamp } from "firebase/firestore";
import finalSaveCustomData from "@custom-data-utils/finalSaveCustomData";
import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";

export default async function addCustomDataForShow(show: ShowbizItem | null) {
  if (!show) return;

  const customDataList = getAllCustomDataList();

  const storeItem = customDataList.find((item) => item.id === show.id);

  // already have custom data for this show
  if (storeItem) return;

  // new item, if not found
  const newData = {
    id: show.id,
    name: show.name,
    watchStatus: "no status",
    collections: [],
    createdDate: show.lastHydrationDate ?? Timestamp.fromDate(new Date()),
    editedDate: show.lastHydrationDate ?? Timestamp.fromDate(new Date()),
  };

  customDataList.push(newData);

  await finalSaveCustomData(newData);
}
