import { CustomDataItem, ShowbizItem } from "@types";
import { Timestamp } from "firebase/firestore";
import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";

export default function getCustomDataForShow(
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
    watchStatus: "no status",
    collections: [],
    createdDate: show.lastHydrationDate ?? Timestamp.fromDate(new Date()),
    editedDate: show.lastHydrationDate ?? Timestamp.fromDate(new Date()),
  };
}
