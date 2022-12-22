import { CustomDataItem } from "@types";
import { sortAlphaNumeric } from "@utils/helpers";

export default function getAllCollections(
  customDataList: CustomDataItem[]
): string[] {
  if (!customDataList || customDataList.length === 0) return [];
  const set = new Set<string>();
  customDataList.forEach(
    (item) =>
      item.collections &&
      item.collections.forEach((collection) => set.add(collection))
  );
  return Array.from(set).sort(sortAlphaNumeric);
}
