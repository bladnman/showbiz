import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";
import isShowInList from "@show-utils/isShowInList";
import { fire_saveShow } from "@services/firestore/utils/fire_utils";
import setShows from "@show-utils/setShows";

export default async function updateShow(show?: ShowbizItem | null) {
  if (!show) return;
  const shows = useMegaStore.getState().shows;

  // not a list show, nothing to update
  if (!isShowInList(show, shows)) return;

  // add to/update cloud
  await fire_saveShow(show);

  // - remove any previous version from list
  // - add the new one
  // - save list and notify of change
  setShows(shows.filter((item) => item.id !== show.id).concat(show));
}
