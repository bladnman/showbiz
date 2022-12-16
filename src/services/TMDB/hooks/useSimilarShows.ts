import { useEffect, useState } from "react";
import useMegaStore from "../../../store/MegaStore";
import { ShowbizItem } from "@types";
import { getCleanedData } from "./useApi";
import Diary from "../../../utils/Diary";

const promiseDiary = new Diary(300);
export default function useSimilarShows<T>(show?: ShowbizItem | null) {
  const tmdb = useMegaStore((state) => state.tmdb);
  const [shows, setShows] = useState<T | null | undefined>();
  const [error, setError] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const type = show?.isMovie ? "movie" : "tv";

  useEffect(() => {
    if (!show) return;
    const doFetch = async () => {
      // we want to reuse this api call if possible
      let promise = promiseDiary.read(`${show.id}`);
      if (!promise) {
        promise = promiseDiary.write(
          `${show.id}`,
          tmdb.searchSimilar(show.id, { type })
        );
      }

      const data = await promise;
      setShows(getCleanedData(data) as T);
      setError(error);
      setIsLoading(false);
    };

    setIsLoading(true);
    setShows(undefined);
    setError(null);
    doFetch().catch();
  }, [show]);

  return [shows, isLoading, error];
}
