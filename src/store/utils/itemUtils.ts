import { ShowbizItem } from "../../services/TMDB/utils/convertToItem";
import useMegaStore from "../MegaStore";

export function setDetailItem(item: ShowbizItem | null) {
  useMegaStore.setState({
    detailItem: item,
  });
}
