import { useEffect } from "react";
import { fetchShow } from "../../../services/TMDB/hooks/useApi";
import { isFullResults } from "../../../services/TMDB/utils/duckTyping";
import useMegaStore from "../../../store/MegaStore";
import { setSearchSelectedItem } from "../../../store/utils/itemUtils";

export default function useSearchSelectedShow() {
  const searchSelectedItem = useMegaStore((state) => state.searchSelectedItem);

  useEffect(() => {
    // verify current searchSelectedItem is not full results
    if (isFullResults(searchSelectedItem)) return;
    // fetch full item
    const doFetch = async () => {
      if (!searchSelectedItem) return;

      const [data, error] = await fetchShow(searchSelectedItem);
      if (!error) {
        setSearchSelectedItem(data);
      }
    };
    doFetch();

    // set search selected to this item
  }, [searchSelectedItem]);

  return searchSelectedItem;
}
