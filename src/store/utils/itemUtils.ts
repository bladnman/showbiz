import { ShowbizItem } from "../../@types";
import {
  deleteShowFromCloud,
  saveShowToCloud,
} from "../../services/firestore/utils/fire_utils";
import useMegaStore from "../MegaStore";
import { keys } from "lodash";

export function isShowInList(show: ShowbizItem | null, shows: ShowbizItem[]) {
  return !!getShowFromList(show, shows);
}

export function getShowFromList(
  show: ShowbizItem | null,
  shows?: ShowbizItem[]
) {
  if (!show) return undefined;

  shows = shows ?? useMegaStore.getState().shows;

  if (!shows || shows.length < 1) return undefined;
  return shows.find((item) => item.id === show.id);
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

export function getAllCollections(shows: ShowbizItem[]): string[] {
  if (!shows || shows.length === 0) return [];
  const set = new Set<string>();
  shows.forEach(
    (show) =>
      show.collections &&
      show.collections.forEach((collection) => set.add(collection))
  );
  return Array.from(set).sort();
}

export function showContainsCollection(
  show: ShowbizItem,
  collection: string,
  shows?: ShowbizItem[]
): boolean {
  shows = shows ?? useMegaStore.getState().shows;
  return collectionsForShow(show, shows).includes(collection);
}

export function collectionsForShow(show: ShowbizItem, shows?: ShowbizItem[]) {
  shows = shows ?? useMegaStore.getState().shows;
  return getShowFromList(show, shows)?.collections ?? [];
}

export function getAllGenres(shows: ShowbizItem[]): string[] {
  const set = new Set<string>();
  shows.forEach(
    (show) => show.genres && show.genres.forEach((genre) => set.add(genre.name))
  );
  return Array.from(set).sort();
}

export function addCollection(show: ShowbizItem, collectionName: string) {
  const set = new Set<string>(show.collections);
  set.add(collectionName.toLowerCase());
  show.collections = Array.from(set).sort();
}

export function overlayMissingKeys(ontoObject: any, fromObject: any) {
  if (!ontoObject || !fromObject) return ontoObject;

  for (const [key, value] of Object.entries(fromObject)) {
    if (!(key in ontoObject)) ontoObject[key] = value;
  }
  return ontoObject;
}

export function updateObject(targetObject: any, fromObject: any) {
  if (!targetObject || !fromObject) return targetObject;

  for (const [key, value] of Object.entries(fromObject)) {
    targetObject[key] = value;
  }
  return targetObject;
}
