import { CustomDataItem, ShowbizItem } from "@types";
import { useCollectionsFilter } from "./useCollectionsFilter";
import { useDecadeFilter } from "./useDecadeFilter";
import { useEffect } from "react";
import { setBodyShows } from "@utils/itemUtils";
import { useGenreFilter } from "./useGenreFilter";
import filterOrInSetAndBetween from "../utils/filterOrInSetAndBetween";
import { useShowTypeFilter } from "./useShowTypeFilter";
import { useWatchStatusFilter } from "@features/app/app-drawer/hooks/useWatchStatusFilter";

export function useDrawerFilters(
  shows: ShowbizItem[],
  collections: string[],
  customDataList: CustomDataItem[]
) {
  const decadeFilter = useDecadeFilter(shows);
  const collectionsFilter = useCollectionsFilter(shows, collections);
  const watchStatusFilter = useWatchStatusFilter(shows, customDataList);
  const genreFilter = useGenreFilter(shows);
  const showTypeFilter = useShowTypeFilter(shows);

  useEffect(() => {
    const filteredShowsSet = filterOrInSetAndBetween(
      [
        collectionsFilter.filteredShowsSet,
        watchStatusFilter.filteredShowsSet,
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
    watchStatusFilter.filteredShowsSet,
    showTypeFilter.filteredShowsSet,
    decadeFilter.filteredShowsSet,
    genreFilter.filteredShowsSet,
  ]);

  return [
    collectionsFilter,
    watchStatusFilter,
    showTypeFilter,
    genreFilter,
    decadeFilter,
  ];
}
