import {
  deleteShowFromCloud,
  saveShowToCloud,
} from "../../services/firestore/utils/fire_utils";
import { ShowbizItem } from "../../services/TMDB/utils/convertToItem";
import useMegaStore from "../MegaStore";

export function isShowInList(show: ShowbizItem | null, shows: ShowbizItem[]) {
  if (!show) return false;
  if (!shows || shows.length < 1) return false;
  return Boolean(shows.find((item) => item.id === show.id));
}

/**
 * add show is used to store a new show in the cloud. This
 * function first checks to see that this show is not already
 * saved. Safe to call.
 * @param show
 */
export function addShow(show?: ShowbizItem | null) {
  if (!show) return;
  const shows = useMegaStore.getState().shows;

  // only do work if this show is unknown?
  if (!isShowInList(show, shows)) {
    saveShowToCloud(show);
    shows.push(show);
  }
  setShows(shows);
}

/**
 * remove show is used to remove a show from the collection,
 * as well as removing any saved data. Safe to call.
 * @param show
 */
export function removeShow(show?: ShowbizItem | null) {
  if (!show) return;
  const shows = useMegaStore.getState().shows;

  // only do work if this show is known?
  if (isShowInList(show, shows)) {
    deleteShowFromCloud(show).catch((er) =>
      console.error("Problem deleting from cloud!", er)
    );
  }
  setShows(shows.filter((item) => item.id !== show.id));
}

/**
 * update shows allows the UI to signal an intent to "redraw". If
 * data on a show is updated this function should then be called
 * to redraw any of the grids or filters, etc.
 */
export function updateShows() {
  const shows = useMegaStore.getState().shows;
  setShows(shows);
}

/**
 * setShows will always republish the `shows` array. This makes
 * this call an effective "update" to all UI.
 * @param shows
 */
export function setShows(shows: ShowbizItem[]) {
  useMegaStore.setState({
    shows: [...shows],
  });
}

export function setDetailItem(item: ShowbizItem | null) {
  useMegaStore.setState({
    detailItem: item,
  });
}

export function setSearchSelectedItem(item: ShowbizItem | null) {
  useMegaStore.setState({
    searchSelectedItem: item,
  });
}
