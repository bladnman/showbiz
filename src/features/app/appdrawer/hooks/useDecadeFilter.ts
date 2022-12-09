import { Filter, ShowbizItem } from "../../../../@types";
import useCollectionTools from "../../../../hooks/useCollectionTools";
import { useFilter } from "./useFilter";
import useDecades from "../../../../hooks/useDecades";
import { getReleaseDecade } from "../../../../services/TMDB/utils/yearUtils";

export function useDecadeFilter(): Filter {
  const decades = useDecades();

  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return getReleaseDecade(show) === parseInt(filterValue);
  };

  return useFilter({
    title: "Decades",
    items: decades,
    filterFn,
  });
}
