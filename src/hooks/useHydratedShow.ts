import { useEffect, useState } from "react";
import { ShowbizItem } from "../@types";
import {
  getShowFromList,
  mergeObjects,
  updateObject,
  updateShows,
} from "../store/utils/itemUtils";
import { minSince, secSince } from "../utils/MU";
import { fetchApiShow } from "../services/TMDB/hooks/useApi";
import { saveShowToCloud } from "../services/firestore/utils/fire_utils";
import { REFRESH_DETAILS_SEC } from "../store/const";

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
    if (!withShow) {
      // clear previous show if there was one
      if (show) {
        setShow(null);
      }
      return;
    }

    const doFetch = async () => {
      let finalShow: ShowbizItem;
      const listShow = getShowFromList(withShow);
      const secSinceHydration = secSince(listShow?.lastHydrationDate?.toDate());

      // API PULL NEEDED
      if (!listShow || secSinceHydration > REFRESH_DETAILS_SEC) {
        const sourceShow = listShow ?? withShow; // we want to use listShow if possible

        // PULL FROM API : hydrate
        // todo: make this a stored promise that all can reuse
        const [tmdbShow] = await fetchApiShow(sourceShow);

        // MERGE & UPDATE LIST? : this will update the data in the list if there was a listShow
        finalShow = mergeObjects(tmdbShow, sourceShow); // move user data onto tmdb show
        finalShow = updateObject(sourceShow, finalShow); // update "listShow" if there was one

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
