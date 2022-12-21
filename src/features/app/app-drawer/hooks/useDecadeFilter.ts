import { FilterDef, ShowbizItem } from "@types";
import useCollectionTools from "../../../../hooks/useCollectionTools";
import { useFilter } from "./useFilter";
import useDecades from "../../../../hooks/useDecades";
import { getReleaseDecade } from "../../../../services/TMDB/utils/yearUtils";

export function useDecadeFilter(shows: ShowbizItem[]): FilterDef {
  const decades = useDecades(shows);

  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return getReleaseDecade(show) === parseInt(filterValue);
  };

  return useFilter({
    title: "Decades",
    filterValues: decades,
    filterFn,
  });
}
