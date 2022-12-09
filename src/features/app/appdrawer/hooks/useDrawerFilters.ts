import { ShowbizItem } from "../../../../@types";
import { useCollectionsFilter } from "./useCollectionsFilter";
import { useDecadeFilter } from "./useDecadeFilter";
import { useEffect } from "react";
import { setBodyShows } from "../../../../store/utils/itemUtils";
import { useGenreFilter } from "./useGenreFilter";
import filterAllSetsOr from "../utils/filterAllSetsOr";
import filterOrInSetAndBetween from "../utils/filterOrInSetAndBetween";

export function useDrawerFilters(shows: ShowbizItem[]) {
  const collectionsFilter = useCollectionsFilter(shows);
  const decadeFilter = useDecadeFilter(shows);
  const genreFilter = useGenreFilter(shows);

  useEffect(() => {
    const filteredShowsSet = filterOrInSetAndBetween(
      [
        collectionsFilter.filteredShowsSet,
        decadeFilter.filteredShowsSet,
        genreFilter.filteredShowsSet,
      ],
      shows
    );
    setBodyShows(Array.from(filteredShowsSet));
  }, [
    shows,
    collectionsFilter.filteredShowsSet,
    decadeFilter.filteredShowsSet,
    genreFilter.filteredShowsSet,
  ]);

  return [collectionsFilter, genreFilter, decadeFilter];
}
