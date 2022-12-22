import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function addToSelectedShows(show: ShowbizItem) {
  const selectedShows = useMegaStore.getState().selectedShows;
  const newSelectedShows = [...selectedShows, show];
  useMegaStore.setState({
    selectedShows: newSelectedShows,
  });
}
