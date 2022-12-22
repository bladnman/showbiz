import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function removeFromSelectedShows(show: ShowbizItem) {
  const selectedShows = useMegaStore.getState().selectedShows;
  const newSelectedShows = selectedShows.filter((item) => item.id !== show.id);
  useMegaStore.setState({
    selectedShows: newSelectedShows,
  });
}
