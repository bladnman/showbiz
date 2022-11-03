import { useEffect, useState } from "react";
import { Movie } from "../../@types/TMDB";
import useMegaStore from "../../store/MegaStore";
import { NotFoundError } from "../errors";

export default function useMovie(id: number) {
  const tmdb = useMegaStore((state) => state.tmdb);
  const [movie, setMovie] = useState<Movie | null | undefined>();

  useEffect(() => {
    if (!tmdb) return;
    const doFetch = async () => {
      try {
        const movie = await tmdb.getMovie(id);
        setMovie(movie);
      } catch (error: any) {
        // NOT FOUND
        if (error?.name === "NotFoundError") {
          console.warn("That movie does not exist");
          setMovie(null);
        } else {
          console.error(`There was an error fetching the movie`, error);
        }
      }
    };
    doFetch();
  }, [tmdb]);

  return movie;
}
