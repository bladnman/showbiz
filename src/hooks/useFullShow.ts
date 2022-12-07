import { ShowbizItem } from "../@types";
import { fetchApiShow } from "../services/TMDB/hooks/useApi";
import { useEffect, useState } from "react";
import {
  getShowFromList,
  updateObject,
  updateShows,
} from "../store/utils/itemUtils";
import { minSince } from "../utils/MU";
import { saveShowToCloud } from "../services/firestore/utils/fire_utils";

export default function useFullShow(withShow?: ShowbizItem | null) {
  const [show, setShow] = useState(withShow);

  useEffect(() => {
    if (!withShow) return;

    const doFetch = async () => {
      let finalShow: ShowbizItem;
      const listShow = getShowFromList(withShow);
      const minSinceHydration = minSince(listShow?.lastHydrationDate?.toDate());

      // API PULL NEEDED
      if (!listShow || minSinceHydration > 30) {
        const [tmdbShow] = await fetchApiShow(listShow ?? withShow);

        // try to update the listShow if possible
        // as this will update the data in the list also
        finalShow = updateObject(listShow ?? withShow, tmdbShow);

        // DO WE WANT TO SAVE THIS ONE?
        if (listShow) {
          await saveShowToCloud(finalShow);
        }

        // tell app the data has changed
        updateShows();
      }

      // SHOW RECENT ENOUGH
      else {
        finalShow = listShow;
      }

      setShow(finalShow);
    };

    doFetch().catch();
  }, [withShow]);

  return show;
}
