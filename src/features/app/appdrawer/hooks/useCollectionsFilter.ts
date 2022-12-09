import { Filter, ShowbizItem } from "../../../../@types";
import { useFilter } from "./useFilter";
import useCollections from "../../../../hooks/useCollections";

export function useCollectionsFilter(shows: ShowbizItem[]): Filter {
  const collections = useCollections(shows);

  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return show.collections?.includes(filterValue);
  };

  return useFilter({
    title: "Collections",
    items: collections,
    filterFn,
  });
}
