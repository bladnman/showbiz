import useMegaStore from "@store/MegaStore";
import setShows from "@show-utils/setShows";

/**
 * update shows allows the UI to signal an intent to "redraw". If
 * data on a show is updated this function should then be called
 * to redraw any of the grids or filters, etc.
 */
export default function updateShows() {
  const shows = useMegaStore.getState().shows;
  setShows(shows);
}
