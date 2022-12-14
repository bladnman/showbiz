import { CustomDataItem, ShowbizItem } from "../@types";
import { fire_saveCustomData } from "../services/firestore/utils/fire_utils";
import useMegaStore from "../store/MegaStore";
import { Timestamp } from "firebase/firestore";

export function getCustomDataForShow(
  show: ShowbizItem | null
): CustomDataItem | null {
  if (!show) return null;

  const customDataList = useMegaStore.getState().customDataList;

  const storeItem = customDataList.find((item) => item.id === show.id);
  if (storeItem) return storeItem;

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

  const customDataList = useMegaStore.getState().customDataList;

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
  const customDataList = useMegaStore.getState().customDataList;
  return customDataList.filter((item) =>
    shows.find((show) => show.id === item.id)
  );
}

export function markCustomDataListAsChanged() {
  const customDataList = useMegaStore.getState().customDataList;
  useMegaStore.setState({
    customDataList: [...customDataList],
  });
}

export function finalSaveCustomData(customData: CustomDataItem | null) {
  if (!customData) return;
  fire_saveCustomData(customData).catch();
  markCustomDataListAsChanged();
}
