import { FilterDef, ShowbizItem } from "../../../../@types";
import { useFilter } from "./useFilter";
import useGenres from "../../../../hooks/useGenres";
import showContainsGenre from "@show-utils/showContainsGenre";

export function useGenreFilter(shows: ShowbizItem[]): FilterDef {
  const genres = useGenres(shows);

  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return showContainsGenre(show, filterValue);
  };

  return useFilter({
    title: "Genres",
    filterValues: genres,
    filterFn,
  });
}
