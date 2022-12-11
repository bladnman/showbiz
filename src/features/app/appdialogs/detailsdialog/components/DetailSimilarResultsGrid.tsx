import ShowGrid from "../../../../../components/ShowGrid";
import { ShowbizItem } from "../../../../../@types";
import useMegaStore from "../../../../../store/MegaStore";
import { setDetailItem } from "../../../../../utils/itemUtils";
import useSimilarShows from "../../../../../services/TMDB/hooks/useSimilarShows";

export default function DetailSimilarResultsGrid() {
  const similarToShow = useMegaStore((state) => state.similarToShow);

  /**
   * ```
   *                      _
   *  ___ ___ ___ ___ ___| |_
   * |_ -| -_| .'|  _|  _|   |
   * |___|___|__,|_| |___|_|_|
   * ```
   * Perform a new search
   */
  const [shows] = useSimilarShows(similarToShow);

  const onClick = (show: ShowbizItem) => {
    setDetailItem(show);
  };

  return <ShowGrid shows={shows} onClick={onClick} />;
}
