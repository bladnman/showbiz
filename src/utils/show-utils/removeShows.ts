import { ShowbizItem } from "@types";
import { fire_deleteShow } from "@services/firestore/utils/fire_utils";
import useMegaStore from "@store/MegaStore";
import markCustomDataListAsChanged from "@custom-data-utils/markCustomDataListAsChanged";
import setShows from "@show-utils/setShows";

export default async function removeShows(shows?: ShowbizItem[]) {
  if (!shows || shows.length < 1) return;

  const removePromises: Promise<void>[] = [];
  shows.forEach((show) => removePromises.push(fire_deleteShow(show)));
  await Promise.all(removePromises);

  const allShows = useMegaStore.getState().shows;
  setShows(allShows.filter((show) => shows.indexOf(show) < 0));
  markCustomDataListAsChanged();
}
