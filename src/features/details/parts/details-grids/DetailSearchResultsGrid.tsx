import React from "react";
import { useEffect } from "react";
import ShowGrid from "@components/show-collections/ShowGrid";
import { ShowbizItem } from "../../../../@types";
import useMegaStore from "../../../../store/MegaStore";
import { useApiSearch } from "../../../../services/TMDB/hooks/useApi";
import setDetailItem from "@show-utils/setDetailItem";

export default function DetailSearchResultsGrid({
  columns,
  maxPosterWidth,
  gridWidth,
}: {
  columns?: number;
  maxPosterWidth?: number;
  gridWidth?: number;
}) {
  const searchQuery = useMegaStore((state) => state.searchQuery);
  const searchType = useMegaStore((state) => state.searchType);

  /**
   * ```
   *                      _
   *  ___ ___ ___ ___ ___| |_
   * |_ -| -_| .'|  _|  _|   |
   * |___|___|__,|_| |___|_|_|
   * ```
   * Perform a new search
   */
  const [shows] = useApiSearch(searchQuery, {
    type: searchType,
  });

  /** select first result on new search results */
  useEffect(() => {
    if (!shows) return;
    setDetailItem(shows[0]);
  }, [shows]);

  const onClick = (show: ShowbizItem) => {
    setDetailItem(show);
  };

  return (
    <ShowGrid
      shows={shows}
      onClick={onClick}
      columns={columns}
      maxPosterWidth={maxPosterWidth}
      gridWidth={gridWidth}
    />
  );
}
