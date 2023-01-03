import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function getShowById(id: number, shows?: ShowbizItem[]) {
  if (!id) return undefined;

  shows = shows ?? useMegaStore.getState().shows;
  if (!shows || shows.length < 1) return undefined;

  return shows.find((item) => item.id === id);
}
