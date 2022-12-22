import { CustomDataItem } from "@types";
import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";

export default function countOccurrencesOfItem(customData: CustomDataItem) {
  const customDataList = getAllCustomDataList();
  return customDataList.filter((item) => item.id === customData.id).length;
}
