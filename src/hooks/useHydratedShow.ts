import { useEffect, useState } from "react";
import { ShowbizItem } from "../@types";
import {
  getShowFromList,
  updateObject,
  updateShows,
} from "../store/utils/itemUtils";
import { minSince } from "../utils/MU";
import { fetchApiShow } from "../services/TMDB/hooks/useApi";
import { saveShowToCloud } from "../services/firestore/utils/fire_utils";

/**
 * ```
 *              _____       _         _         _ _____ _
 *  _ _ ___ ___|  |  |_ _ _| |___ ___| |_ ___ _| |   __| |_ ___ _ _ _
 * | | |_ -| -_|     | | | . |  _| .'|  _| -_| . |__   |   | . | | | |
 * |___|___|___|__|__|_  |___|_| |__,|_| |___|___|_____|_|_|___|_____|
 *                   |___|
 * ```
 * will `hydrate` your show as much as possible
 * */
export default function useHydratedShow(withShow?: ShowbizItem | null) {
  const [show, setShow] = useState(withShow);

  useEffect(() => {
    if (!withShow) return;

    const doFetch = async () => {
      let finalShow: ShowbizItem;
      const listShow = getShowFromList(withShow);
      const minSinceHydration = minSince(listShow?.lastHydrationDate?.toDate());

      // API PULL NEEDED
      if (!listShow || minSinceHydration > 30) {
        const sourceShow = listShow ?? withShow; // we want to use listShow if possible

        // PULL FROM API : hydrate
        // todo: make this a stored promise that all can reuse
        const [tmdbShow] = await fetchApiShow(sourceShow);

        // MERGE & UPDATE LIST? : this will update the data in the list if there was a listShow
        finalShow = updateObject(sourceShow, tmdbShow);

        if (listShow) {
          // UPDATE CLOUD? : if this was in the cloud already
          await saveShowToCloud(finalShow);

          // NOTIFY : tell app the data has changed
          // since the updateObject may have changed this item
          updateShows();
        }
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
