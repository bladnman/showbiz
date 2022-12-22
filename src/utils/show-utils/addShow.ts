import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";
import isShowInList from "@show-utils/isShowInList";
import { fire_saveShow } from "@services/firestore/utils/fire_utils";
import addCustomDataForShow from "@custom-data-utils/addCustomDataForShow";
import setShows from "@show-utils/setShows";

/**
 * add show is used to store a new show in the cloud. This
 * function first checks to see that this show is not already
 * saved. Safe to call.
 * @param show
 */
export default async function addShow(show?: ShowbizItem | null) {
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
