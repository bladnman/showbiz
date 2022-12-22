import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function selectShows(shows: ShowbizItem[]) {
  useMegaStore.setState({
    selectedShows: shows,
  });
}
