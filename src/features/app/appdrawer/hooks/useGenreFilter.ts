import { Filter, ShowbizItem } from "../../../../@types";
import { useFilter } from "./useFilter";
import { showContainsGenre } from "../../../../store/utils/itemUtils";
import useGenres from "../../../../hooks/useGenres";

export function useGenreFilter(shows: ShowbizItem[]): Filter {
  const genres = useGenres(shows);

  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return showContainsGenre(show, filterValue);
  };

  return useFilter({
    title: "Genres",
    items: genres,
    filterFn,
  });
}
