import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";
import isShowInList from "@show-utils/isShowInList";
import { fire_saveShow } from "@services/firestore/utils/fire_utils";

export default function updateShowInCloud(show?: ShowbizItem | null) {
  if (!show) return;
  const shows = useMegaStore.getState().shows;

  // not a saved show, nothing we can do
  if (!isShowInList(show, shows)) return;

  // add to/update cloud
  fire_saveShow(show).catch();
}
