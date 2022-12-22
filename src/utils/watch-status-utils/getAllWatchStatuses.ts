import { CustomDataItem } from "@types";

export default function getAllWatchStatuses(
  customDataList: CustomDataItem[]
): string[] {
  if (!customDataList || customDataList.length === 0) return [];
  const set = new Set<string>();
  customDataList.forEach((item) => set.add(item.watchStatus));
  return Array.from(set).sort();
}
