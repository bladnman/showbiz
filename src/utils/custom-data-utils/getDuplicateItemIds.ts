import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";
import countOccurrencesOfItem from "@custom-data-utils/countOccurrencesOfItem";

export default function getDuplicateItemIds(): Set<number> {
  const customDataList = getAllCustomDataList();
  const duplicateItems = customDataList.filter(
    (customData) => countOccurrencesOfItem(customData) > 1
  );
  const idSet = new Set<number>();
  duplicateItems.forEach((item) => {
    idSet.add(item.id);
    console.log(`[🐽](customDataUtils) DUPE`, item.name);
  });
  return idSet;
}
