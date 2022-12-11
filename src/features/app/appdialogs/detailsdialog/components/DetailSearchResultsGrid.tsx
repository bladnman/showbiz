import { useEffect } from "react";
import ShowGrid from "../../../../../components/ShowGrid";
import { ShowbizItem } from "../../../../../@types";
import useMegaStore from "../../../../../store/MegaStore";
import { useApiSearch } from "../../../../../services/TMDB/hooks/useApi";
import { setDetailItem } from "../../../../../utils/itemUtils";

export default function DetailSearchResultsGrid() {
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

  return <ShowGrid shows={shows} onClick={onClick} />;
}
