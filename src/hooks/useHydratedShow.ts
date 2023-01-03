import { useEffect, useState } from "react";
import { ShowbizItem } from "@types";
import { secSince } from "@utils/MU";
import { fetchApiShow } from "@services/TMDB/hooks/useApi";
import { fire_saveShow } from "@services/firestore/utils/fire_utils";
import { REFRESH_DETAILS_SEC } from "@store/const";
import getShowFromList from "@show-utils/getShowFromList";
import updateShows from "@show-utils/updateShows";
import updateObject from "@show-utils/updateObject";
import mergeObjects from "@show-utils/mergeObjects";
import { Timestamp } from "firebase/firestore";
import updateShow from "@show-utils/updateShow";

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
    // no show, let's clear and leave
    if (!withShow) {
      setShow(undefined);
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
        finalShow = mergeObjects(tmdbShow, sourceShow) as ShowbizItem; // move user data onto tmdb show
        finalShow = updateObject(sourceShow, finalShow) as ShowbizItem; // update "listShow" if there was one

        // update hydration date!
        finalShow.lastHydrationDate = Timestamp.fromDate(new Date());

        await updateShow(finalShow);
      }

      // SHOW RECENT ENOUGH
      else {
        finalShow = listShow;
      }

      setShow({ ...finalShow });
    };

    setShow(withShow); // start with our seed show (pre-hydrated)
    doFetch().catch();
  }, [withShow]);

  return show;
}
