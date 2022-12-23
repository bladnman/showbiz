import { CustomDataItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function setCustomDataList(customDataList: CustomDataItem[]) {
  console.log(`[🐽](setCustomDataList.ts) SAVING CUSTOM DATA`); // ! remove me
  useMegaStore.setState({
    customDataList: [...customDataList],
  });
}
