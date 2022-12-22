import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function setSimilarToShow(show: ShowbizItem | null) {
  useMegaStore.setState({
    similarToShow: show,
  });
}
