import { CustomDataItem, ShowbizItem } from "@types";
import {
  fire_deleteShow,
  fire_saveShow,
} from "@services/firestore/utils/fire_utils";
import useMegaStore from "../store/MegaStore";
import { setSearchQuery } from "./searchUtils";
import { getReleaseDecade } from "@services/TMDB/utils/yearUtils";
import { showContainsCollection } from "./collectionUtils";
import {
  addCustomDataForShow,
  markCustomDataListAsChanged,
} from "./customDataUtils";
import { isNoU } from "@utils/MU";

export function isShowInList(
  show: ShowbizItem | null | undefined,
  shows: ShowbizItem[]
) {
  if (!show) return false;
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
export async function addShow(show?: ShowbizItem | null) {
  if (!show) return;
  const shows = useMegaStore.getState().shows;

  // already saved, move on
  if (isShowInList(show, shows)) return;

  // add to/update cloud
  await fire_saveShow(show);

  // push to local list
  shows.push(show);

  // we need custom data as well
  await addCustomDataForShow(show);

  // save to cloud and notify of change
  setShows(shows);
}

export function updateShowInCloud(show?: ShowbizItem | null) {
  if (!show) return;
  const shows = useMegaStore.getState().shows;

  // not a saved show, nothing we can do
  if (!isShowInList(show, shows)) return;

  // add to/update cloud
  fire_saveShow(show).catch();
}

/**
 * remove show is used to remove a show from the collection,
 * as well as removing any saved data. Safe to call.
 * @param show
 */
export async function removeShow(show?: ShowbizItem | null) {
  if (!show) return;
  const shows = useMegaStore.getState().shows;

  // only do work if this show is known?
  if (isShowInList(show, shows)) {
    await fire_deleteShow(show);
  }

  setShows(shows.filter((item) => item.id !== show.id));
  markCustomDataListAsChanged();
}

export async function removeShows(shows?: ShowbizItem[]) {
  if (!shows || shows.length < 1) return;

  const removePromises: Promise<void>[] = [];
  shows.forEach((show) => removePromises.push(fire_deleteShow(show)));
  await Promise.all(removePromises);

  const allShows = useMegaStore.getState().shows;
  setShows(allShows.filter((show) => shows.indexOf(show) < 0));
  markCustomDataListAsChanged();
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

export function setCustomDataList(customDataList: CustomDataItem[]) {
  useMegaStore.setState({
    customDataList: [...customDataList],
  });
}

export function setBodyShows(shows: ShowbizItem[]) {
  const curBodyShows = useMegaStore.getState().bodyShows;

  // verify something has changed
  const hasChanged = (() => {
    if (!curBodyShows) return true;
    if (shows.length !== curBodyShows.length) return true;
    for (let i = 0; i < shows.length; i++) {
      if (shows[i] !== curBodyShows[i]) return true;
    }
    return false;
  })();

  if (hasChanged) {
    useMegaStore.setState({
      bodyShows: [...shows],
    });
  }
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

export function showContainsGenre(show: ShowbizItem, genre: string) {
  if (!show) return false;
  const foundItem = show.genres?.find(
    (showGenre) => showGenre.name.toLowerCase() === genre.toLowerCase()
  );
  return !!foundItem;
}

export function showsWithGenre(shows: ShowbizItem[], value: string) {
  return shows?.filter((show) => showContainsGenre(show, value)) ?? [];
}

export function showsWithCollection(shows: ShowbizItem[], value: string) {
  return shows?.filter((show) => showContainsCollection(show, value)) ?? [];
}

export function getAllGenres(shows?: ShowbizItem[]): string[] {
  if (!shows?.length) return [];

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

export function getShowType(show: ShowbizItem): "movie" | "tv" | null {
  if (!show) return null;
  return show.isMovie ? "movie" : show.isTv ? "tv" : null;
}

export function getAllShowTypes(shows: ShowbizItem[]): string[] {
  if (!shows?.length) return [];

  const set = new Set<string>();
  shows.forEach((show) => {
    const type = getShowType(show);
    if (type) set.add(type);
  });
  return Array.from(set).sort();
}

// export function getAllYears(shows: ShowbizItem[]): string[] {
//   const set = new Set<string>();
//   shows
//     .filter((show) => !!getReleaseYear(show))
//     .forEach((show) => set.add(getReleaseYear(show) as string));
//   return Array.from(set).sort();
// }
//
// export function overlayMissingKeys(ontoObject: any, fromObject: any) {
//   if (!ontoObject || !fromObject) return ontoObject;
//
//   for (const [key, value] of Object.entries(fromObject)) {
//     if (!(key in ontoObject)) ontoObject[key] = value;
//   }
//   return ontoObject;
// }

export function updateObject(
  targetObject: Record<string, unknown>,
  fromObject: Record<string, unknown>
) {
  if (!targetObject || !fromObject) return targetObject;

  for (const [key, value] of Object.entries(fromObject)) {
    targetObject[key] = value;
  }
  return targetObject;
}

export function mergeObjects(
  object1: Record<string, unknown>,
  object2: Record<string, unknown>
) {
  return { ...object1, ...object2 };
}

export function addToSelectedShows(show: ShowbizItem) {
  const selectedShows = useMegaStore.getState().selectedShows;
  const newSelectedShows = [...selectedShows, show];
  useMegaStore.setState({
    selectedShows: newSelectedShows,
  });
}

export function removeFromSelectedShows(show: ShowbizItem) {
  const selectedShows = useMegaStore.getState().selectedShows;
  const newSelectedShows = selectedShows.filter((item) => item.id !== show.id);
  useMegaStore.setState({
    selectedShows: newSelectedShows,
  });
}

export function clearSelectedShows() {
  useMegaStore.setState({
    selectedShows: [],
  });
}

export function isShowSelected(show: ShowbizItem) {
  const selectedShows = useMegaStore.getState().selectedShows;
  return !!selectedShows.find((item) => item.id === show.id);
}

export function toggleShowSelection(show: ShowbizItem) {
  if (isShowSelected(show)) {
    removeFromSelectedShows(show);
  } else {
    addToSelectedShows(show);
  }
}

export function selectShows(shows: ShowbizItem[]) {
  useMegaStore.setState({
    selectedShows: shows,
  });
}

export function deselectShows(shows: ShowbizItem[]) {
  const selectedShows = useMegaStore.getState().selectedShows;
  const newSelectedShows = selectedShows.filter(
    (item) => !shows.find((show) => show.id === item.id)
  );
  useMegaStore.setState({
    selectedShows: newSelectedShows,
  });
}

export function getPosterSize(width?: number, height?: number) {
  if (!width || !height) {
    // height only, return it
    if (height) {
      return {
        width: height * 0.6666666666666666,
        height,
      };
    }
    if (width) {
      return {
        width,
        height: width * 1.5,
      };
    }
  }

  return {
    width,
    height,
  };
}
