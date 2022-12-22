import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function deselectShows(shows: ShowbizItem[]) {
  const selectedShows = useMegaStore.getState().selectedShows;
  const newSelectedShows = selectedShows.filter(
    (item) => !shows.find((show) => show.id === item.id)
  );
  useMegaStore.setState({
    selectedShows: newSelectedShows,
  });
}
