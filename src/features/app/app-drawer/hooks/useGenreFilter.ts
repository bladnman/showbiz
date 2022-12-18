import { FilterDef, ShowbizItem } from "../../../../@types";
import { useFilter } from "./useFilter";
import { showContainsGenre } from "../../../../utils/itemUtils";
import useGenres from "../../../../hooks/useGenres";

export function useGenreFilter(shows: ShowbizItem[]): FilterDef {
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
