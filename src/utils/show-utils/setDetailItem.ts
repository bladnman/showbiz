import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function setDetailItem(item: ShowbizItem | null) {
  useMegaStore.setState({
    detailItem: item,
  });
}
