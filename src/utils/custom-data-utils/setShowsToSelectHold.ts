import { CustomDataItem, ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function setShowsToSelectHold(shows: ShowbizItem[] | null) {
  useMegaStore.setState({
    showsToSelectHold: shows ? [...shows] : null,
  });
}
