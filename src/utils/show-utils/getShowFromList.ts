import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function getShowFromList(
  show: ShowbizItem | null,
  shows?: ShowbizItem[]
) {
  if (!show) return undefined;

  shows = shows ?? useMegaStore.getState().shows;

  if (!shows || shows.length < 1) return undefined;
  return shows.find((item) => item.id === show.id);
}
