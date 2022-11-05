import { useEffect, useState } from "react";
import {
  ApiFn,
  Movie,
  MovieImage,
  OptionsBag,
  TvShow,
} from "../../@types/TMDB";
import useMegaStore from "../../store/MegaStore";

type UseApiResponse<T> = [T | null | undefined, boolean, any | undefined];
export default function useApi<T>(
  fn: ApiFn,
  id?: number | string,
  options?: OptionsBag
): UseApiResponse<T> {
  const [data, setData] = useState<T | null | undefined>();
  const [error, setError] = useState<any | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const doFetch = async () => {
      if (!id) return;

      try {
        const data = await fn(id, options);
        // const data = await tmdb.getMovie(id, options);
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
  }, [id]);

  return [data, isLoading, error];
}

export function useMovie(id?: number | string) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<Movie>(tmdb.getMovie.bind(tmdb), id);
}
export function useMoviePosters(id?: number | string, options?: OptionsBag) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<MovieImage[]>(tmdb.getMoviePosters.bind(tmdb), id, options);
}
export function useMovieBackdrops(id?: number | string, options?: OptionsBag) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<MovieImage[]>(tmdb.getMovieBackdrops.bind(tmdb), id, options);
}
export function useMovieLogos(id?: number | string, options?: OptionsBag) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<MovieImage[]>(tmdb.getMovieLogos.bind(tmdb), id, options);
}

export function useTvShow(id?: number | string) {
  const tmdb = useMegaStore((state) => state.tmdb);
  return useApi<TvShow>(tmdb.getTvShow.bind(tmdb), id);
}
