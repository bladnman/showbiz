import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";
import isShowInList from "@show-utils/isShowInList";
import { fire_deleteShow } from "@services/firestore/utils/fire_utils";
import markCustomDataListAsChanged from "@custom-data-utils/markCustomDataListAsChanged";
import setShows from "@show-utils/setShows";

/**
 * remove show is used to remove a show from the collection,
 * as well as removing any saved data. Safe to call.
 * @param show
 */
export default async function removeShow(show?: ShowbizItem | null) {
  if (!show) return;
  const shows = useMegaStore.getState().shows;

  // only do work if this show is known?
  if (isShowInList(show, shows)) {
    await fire_deleteShow(show);
  }

  setShows(shows.filter((item) => item.id !== show.id));
  markCustomDataListAsChanged();
}
