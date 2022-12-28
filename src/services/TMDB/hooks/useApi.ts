import { useEffect, useMemo, useState } from "react";
import useMegaStore from "../../../store/MegaStore";
import {
  ApiFn,
  ExternalSource,
  OptionsBag,
  Person,
  Show,
  ShowImage,
  ShowImageCollection,
  ShowType,
} from "../types";
import convertToItem from "../utils/convertToItem";
import { ShowbizItem } from "../../../@types";
import { Timestamp } from "firebase/firestore";

export function useBaseImageUrl() {
  const tmdb = useMegaStore((state) => state.tmdb);
  return tmdb.baseImageUrl;
}

export function useBaseApiImageUrl() {
  const tmdb = useMegaStore((state) => state.tmdb);
  return tmdb.baseApiUrl;
}

export function getCleanedData(data: any) {
  const hasImage = (item: ShowbizItem) =>
    item.posterPath || item.backdropPath || item.profilePath;

  const convertedData = convert(data);

  // filter list
  if (Array.isArray(convertedData)) {
    return convertedData.filter((item: ShowbizItem) => hasImage(item));
  }

  // verify single item has image
  return hasImage(convertedData) ? convertedData : {};
}

//                          _    ___     _       _
//  ___ ___ ___ ___ ___ ___| |  |  _|___| |_ ___| |_ ___ ___
// | . | -_|   | -_|  _| .'| |  |  _| -_|  _|  _|   | -_|  _|
// |_  |___|_|_|___|_| |__,|_|  |_| |___|_| |___|_|_|___|_|
// |___|
type UseApiResponse<T> = [T | null | undefined, boolean, any | undefined];

export async function fetchDataFromApiFn(
  fn: ApiFn,
  queryValue: number | string | null,
  options?: OptionsBag
) {
  if (!queryValue) return null;
  const data = await fn(queryValue, options);
  return data;
}

type FetchFromApiResponse<T> = [T | null | undefined, any | undefined];

export async function fetchFromApi<T>(
  fn: ApiFn,
  queryValue: number | string | null,
  options?: OptionsBag
): Promise<FetchFromApiResponse<T>> {
  let data,
    error = null;
  if (queryValue) {
    try {
      data = getCleanedData(
        await fetchDataFromApiFn(fn, queryValue, options)
      ) as T;
    } catch (er: any) {
      // NOT FOUND
      if (er?.name === "NotFoundError") {
        console.warn("That show does not exist");
      } else {
        console.error(`There was an error fetching the show`, error);
      }
      error = er;
    }
  }
  return [data, error];
}

export function useApi<T>(
  fn: ApiFn,
  queryValue: number | string | null,
  options?: OptionsBag
): UseApiResponse<T> {
  const [data, setData] = useState<T | null | undefined>();
  const [error, setError] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!queryValue) return;
    const doFetch = async () => {
      const [data, error] = await fetchFromApi(fn, queryValue, options);
      setData(data as T);
      setError(error);
      setIsLoading(false);
    };

    setIsLoading(true);
    setData(null);
    setError(null);
    doFetch();
  }, [queryValue]);

  return [data, isLoading, error];
}

function convert(data: any) {
  if (!data) return null;

  // list
  if (Array.isArray(data)) return data.map((item) => convertToItem(item));

  // single
  return convertToItem(data);
}

//      _
//  ___| |_ ___ _ _ _ ___
// |_ -|   | . | | | |_ -|
// |___|_|_|___|_____|___|
export function useApiMovie(id: number | string | null) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<ShowbizItem>(tmdb.getMovie.bind(tmdb), id);
}

export async function fetchApiMovie(id: number | string | null) {
  const tmdb = useMegaStore.getState().tmdb;
  const [data, error] = await fetchFromApi(tmdb.getMovie.bind(tmdb), id);
  return [data, error];
}

export function useApiTv(id: number | string | null) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<ShowbizItem>(tmdb.getTv.bind(tmdb), id);
}

export async function fetchApiTv(id: number | string | null) {
  const tmdb = useMegaStore.getState().tmdb;
  const [data, error] = await fetchFromApi(tmdb.getTv.bind(tmdb), id);
  return [data, error];
}

function addHydrationDate(item: any) {
  if (item) {
    item.lastHydrationDate = Timestamp.fromDate(new Date());
  }
}

//  _
// |_|_____ ___ ___ ___ ___
// | |     | .'| . | -_|_ -|
// |_|_|_|_|__,|_  |___|___|
//             |___|
export function useApiShowPosters(
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

export function useApiShowBackdrops(
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

export function useApiShowLogos(
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

export function useApiShowImages(
  id: number | string,
  type: ShowType,
  options?: OptionsBag
) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<ShowImageCollection>(tmdb.getShowImages.bind(tmdb), id, {
    ...options,
    type,
  });
}

/**
 * ```
 *                      _
 *  ___ ___ ___ ___ ___| |_
 * |_ -| -_| .'|  _|  _|   |
 * |___|___|__,|_| |___|_|_|
 * ```
 * Perform a new search
 * https://developers.themoviedb.org/3/search/multi-search
 */
export function useApiSearch(query: string | null, options?: OptionsBag) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<ShowbizItem[]>(tmdb.search.bind(tmdb), query, options);
}

export function useApiFindShowById(
  id: number | string | null,
  externalSource: ExternalSource | undefined,
  options?: OptionsBag
) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<Show | Person | null>(tmdb.findShowById.bind(tmdb), id, {
    ...options,
    externalSource,
  });
}

export function useApiShow(show?: ShowbizItem | null) {
  const tmdb = useMegaStore((state) => state.tmdb);
  const fn = show?.isMovie ? tmdb.getMovie.bind(tmdb) : tmdb.getTv.bind(tmdb);
  const [pulledShow, isLoading, error] = useApi<ShowbizItem>(
    fn,
    show?.id ?? null
  );
  addHydrationDate(pulledShow);

  return [pulledShow, isLoading, error];
}

export async function fetchApiShow(show: ShowbizItem | null) {
  const tmdb = useMegaStore.getState().tmdb;
  const fn = show?.isMovie ? tmdb.getMovie.bind(tmdb) : tmdb.getTv.bind(tmdb);
  const [data, error] = await fetchFromApi(fn, show?.id ?? null);
  addHydrationDate(data);
  return [data, error];
}
