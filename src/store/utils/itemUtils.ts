import { ShowbizItem } from "../../@types";
import {
  deleteShowFromCloud,
  saveShowToCloud,
} from "../../services/firestore/utils/fire_utils";
import useMegaStore from "../MegaStore";
import { keys } from "lodash";
import { setSearchQuery } from "./searchUtils";
import {
  getReleaseDecade,
  getReleaseYear,
} from "../../services/TMDB/utils/yearUtils";

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
  const isAlreadySaved = isShowInList(show, shows);

  // add to/update cloud
  saveShowToCloud(show).catch();

  // push to local list
  if (!isAlreadySaved) {
    shows.push(show);
  }

  // notify : something internal could have changed
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

export function setBodyShows(shows: ShowbizItem[]) {
  useMegaStore.setState({
    bodyShows: [...shows],
  });
}

export function setDetailItem(item: ShowbizItem | null) {
  useMegaStore.setState({
    detailItem: item,
  });
}

export function setIsDetailsOpen(isOpen: boolean) {
  useMegaStore.setState({
    isDetailsOpen: isOpen,
  });
}

export function showSimilarShows(show: ShowbizItem | null) {
  if (!show) return;
  setSimilarToShow(show);
  setDetailItem(show);
  setIsDetailsOpen(true);
}

export function showSearchFor(keyword: string | null) {
  // if (!keyword) return;
  setSimilarToShow(null);
  setDetailItem(null);
  setSearchQuery(keyword);
  setIsDetailsOpen(true);
}

export function setSimilarToShow(show: ShowbizItem | null) {
  useMegaStore.setState({
    similarToShow: show,
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

export function showContainsGenre(show: ShowbizItem, genre: string) {
  if (!show) return false;
  const foundItem = show.genres?.find(
    (showGenre) => showGenre.name.toLowerCase() === genre.toLowerCase()
  );
  return !!foundItem;
}

export function getAllGenres(shows: ShowbizItem[]): string[] {
  const set = new Set<string>();
  shows.forEach(
    (show) => show.genres && show.genres.forEach((genre) => set.add(genre.name))
  );
  return Array.from(set).sort();
}

export function getAllDecades(shows: ShowbizItem[]): string[] {
  if (!shows?.length) return [];

  const set = new Set<string>();
  shows.forEach((show) => set.add(`${getReleaseDecade(show)}`));
  return Array.from(set).sort();
}

export function getAllYears(shows: ShowbizItem[]): string[] {
  const set = new Set<string>();
  shows
    .filter((show) => !!getReleaseYear(show))
    .forEach((show) => set.add(getReleaseYear(show) as string));
  return Array.from(set).sort();
}

export function addCollection(show: ShowbizItem, collectionName: string) {
  const set = new Set<string>(show.collections);
  set.add(collectionName.toLowerCase());
  show.collections = Array.from(set).sort();
}

export function removeCollection(show: ShowbizItem, collectionName: string) {
  const set = new Set<string>(show.collections);
  set.delete(collectionName.toLowerCase());
  show.collections = Array.from(set).sort();
}

export function toggleCollection(show: ShowbizItem, collectionName: string) {
  const set = new Set<string>(show.collections);
  if (set.has(collectionName.toLowerCase())) {
    removeCollection(show, collectionName);
  } else {
    addCollection(show, collectionName);
  }
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

export function mergeObjects(object1: any, object2: any) {
  return { ...object1, ...object2 };
}
