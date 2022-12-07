import { ShowbizItem } from "../@types";
import { useApiShow } from "../services/TMDB/hooks/useApi";
import { useEffect, useState } from "react";
import {
  getShowFromList,
  updateObject,
  updateShows,
} from "../store/utils/itemUtils";

export default function useFullShow_HOLD(show?: ShowbizItem | null) {
  const [tmdbShow] = useApiShow(show);
  const [finalShow, setFinalShow] = useState<ShowbizItem>();

  useEffect(() => {
    const listShow = getShowFromList(tmdbShow);
    if (listShow) {
      // this show is in the list, and we just hydrated
      // we want to:
      //   - update the show in the list, and
      //   - save
      console.log(
        `[🐽](useFullShow) fullShow.collections`,
        tmdbShow.name,
        tmdbShow.collections
      );
      console.log(
        `[🐽](useFullShow) listShow.collections`,
        listShow.name,
        listShow.collections
      );
      updateObject(tmdbShow, listShow);
      console.log(
        `[🐽](useFullShow) AFTER fullShow.collections`,
        tmdbShow.name,
        tmdbShow.collections
      );

      // TODO: I want to update data on the cloud! right?
      // saveShowToCloud(fullShow);
      updateShows();
    }

    setFinalShow(tmdbShow);
  }, [tmdbShow, show]);

  return finalShow;
}
