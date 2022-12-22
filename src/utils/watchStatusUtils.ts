import { CustomDataItem, ShowbizItem } from "../@types";
import {
  finalSaveCustomData,
  getCustomDataForShow,
  getCustomDataListForShows,
} from "./customDataUtils";

export const WATCH_STATUS_VALUES = [
  "active",
  "up next",
  "hold",
  "no status",
  "done",
];

export function getAllWatchStatuses(
  customDataList: CustomDataItem[]
): string[] {
  if (!customDataList || customDataList.length === 0) return [];
  const set = new Set<string>();
  customDataList.forEach((item) => set.add(item.watchStatus));
  return Array.from(set).sort();
}

export function getAllWatchStatusesForShows(shows: ShowbizItem[]): string[] {
  return sortAccordingToConstant(
    getAllWatchStatuses(getCustomDataListForShows(shows))
  );
}

export function getWatchStatus(show: ShowbizItem | null): string | undefined {
  if (!show) return undefined;
  return getCustomDataForShow(show)?.watchStatus;
}

export function showContainsWatchStatus(
  show: ShowbizItem,
  value: string
): boolean {
  return getWatchStatus(show) === value;
}

export async function setWatchStatus(show: ShowbizItem | null, value: string) {
  const customData = getCustomDataForShow(show);
  if (!customData) return undefined;

  customData.watchStatus = value;
  await finalSaveCustomData(customData);
}

export function sortAccordingToConstant(list: string[]): string[] {
  return list.sort(
    (a, b) => WATCH_STATUS_VALUES.indexOf(a) - WATCH_STATUS_VALUES.indexOf(b)
  );
}
