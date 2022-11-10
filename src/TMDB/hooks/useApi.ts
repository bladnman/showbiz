import { useEffect, useMemo, useState } from "react";
import useMegaStore from "../../store/MegaStore";
import FindByIdRoute from "../../routes/FindByIdRoute/FindByIdRoute";
import {
  ApiFn,
  OptionsBag,
  Movie,
  TvShow,
  ShowType,
  ShowImage,
  Show,
  ExternalSource,
  Person,
} from "../types";

//                          _    ___     _       _
//  ___ ___ ___ ___ ___ ___| |  |  _|___| |_ ___| |_ ___ ___
// | . | -_|   | -_|  _| .'| |  |  _| -_|  _|  _|   | -_|  _|
// |_  |___|_|_|___|_| |__,|_|  |_| |___|_| |___|_|_|___|_|
// |___|
type UseApiResponse<T> = [T | null | undefined, boolean, any | undefined];
export default function useApi<T>(
  fn: ApiFn,
  queryValue?: number | string,
  options?: OptionsBag
): UseApiResponse<T> {
  const [data, setData] = useState<T | null | undefined>();
  const [error, setError] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const doFetch = async () => {
      if (!queryValue) return;

      try {
        const data = await fn(queryValue, options);
        setData(data as T);
        setIsLoading(false);
      } catch (error: any) {
        // NOT FOUND
        if (error?.name === "NotFoundError") {
          console.warn("That movie does not exist");
        } else {
          console.error(`There was an error fetching the movie`, error);
        }
        setIsLoading(false);
        setData(null);
        setError(error);
      }
    };

    setIsLoading(true);
    setData(null);
    setError(null);
    doFetch();
  }, [queryValue]);

  return [data, isLoading, error];
}

//      _
//  ___| |_ ___ _ _ _ ___
// |_ -|   | . | | | |_ -|
// |___|_|_|___|_____|___|
export function useMovie(id?: number | string) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<Movie>(tmdb.getMovie.bind(tmdb), id);
}
export function useTvShow(id?: number | string) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<TvShow>(tmdb.getTvShow.bind(tmdb), id);
}

//  _
// |_|_____ ___ ___ ___ ___
// | |     | .'| . | -_|_ -|
// |_|_|_|_|__,|_  |___|___|
//             |___|
export function useShowPosters(
  id: number | string,
  type: ShowType,
  options?: OptionsBag
) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<ShowImage[]>(tmdb.getShowPosters.bind(tmdb), id, {
    ...options,
    type,
  });
}
export function useShowBackdrops(
  id: number | string,
  type: ShowType,
  options?: OptionsBag
) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<ShowImage[]>(tmdb.getShowBackdrops.bind(tmdb), id, {
    ...options,
    type,
  });
}
export function useShowLogos(
  id: number | string,
  type: ShowType,
  options?: OptionsBag
) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<ShowImage[]>(tmdb.getShowLogos.bind(tmdb), id, {
    ...options,
    type,
  });
}

//                      _
//  ___ ___ ___ ___ ___| |_
// |_ -| -_| .'|  _|  _|   |
// |___|___|__,|_| |___|_|_|
export function useSearch(query?: string, options?: OptionsBag) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<Show[]>(tmdb.search.bind(tmdb), query, options);
}
export function useFindShowById(
  id: number | string | undefined,
  externalSource: ExternalSource | undefined,
  options?: OptionsBag
) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<Show | Person | null>(tmdb.findShowById.bind(tmdb), id, {
    ...options,
    externalSource,
  });
}
