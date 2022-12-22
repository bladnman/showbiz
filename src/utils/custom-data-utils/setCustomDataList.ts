import { CustomDataItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function setCustomDataList(customDataList: CustomDataItem[]) {
  useMegaStore.setState({
    customDataList: [...customDataList],
  });
}
