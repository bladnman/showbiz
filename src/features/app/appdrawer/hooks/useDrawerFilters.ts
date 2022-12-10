import { ShowbizItem } from "../../../../@types";
import { useCollectionsFilter } from "./useCollectionsFilter";
import { useDecadeFilter } from "./useDecadeFilter";
import { useEffect } from "react";
import { setBodyShows } from "../../../../store/utils/itemUtils";
import { useGenreFilter } from "./useGenreFilter";
import filterAllSetsOr from "../utils/filterAllSetsOr";
import filterOrInSetAndBetween from "../utils/filterOrInSetAndBetween";
import { useShowTypeFilter } from "./useShowTypeFilter";

export function useDrawerFilters(shows: ShowbizItem[]) {
  const collectionsFilter = useCollectionsFilter(shows);
  const decadeFilter = useDecadeFilter(shows);
  const genreFilter = useGenreFilter(shows);
  const showTypeFilter = useShowTypeFilter(shows);

  useEffect(() => {
    const filteredShowsSet = filterOrInSetAndBetween(
      [
        collectionsFilter.filteredShowsSet,
        showTypeFilter.filteredShowsSet,
        decadeFilter.filteredShowsSet,
        genreFilter.filteredShowsSet,
      ],
      shows
    );
    setBodyShows(Array.from(filteredShowsSet));
  }, [
    shows,
    collectionsFilter.filteredShowsSet,
    showTypeFilter.filteredShowsSet,
    decadeFilter.filteredShowsSet,
    genreFilter.filteredShowsSet,
  ]);

  return [collectionsFilter, showTypeFilter, genreFilter, decadeFilter];
}
