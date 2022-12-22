import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function isShowSelected(show: ShowbizItem) {
  const selectedShows = useMegaStore.getState().selectedShows;
  return !!selectedShows.find((item) => item.id === show.id);
}
