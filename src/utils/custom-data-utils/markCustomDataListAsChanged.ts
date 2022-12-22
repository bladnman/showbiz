import useMegaStore from "@store/MegaStore";
import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";

export default function markCustomDataListAsChanged() {
  const customDataList = getAllCustomDataList();
  useMegaStore.setState({
    customDataList: [...customDataList],
  });
}
