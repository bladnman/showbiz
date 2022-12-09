import { Filter, ShowbizItem } from "../../../../@types";
import useCollectionTools from "../../../../hooks/useCollectionTools";
import { useFilter } from "./useFilter";

export function useCollectionsFilter(): Filter {
  const { collections } = useCollectionTools();

  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return show.collections?.includes(filterValue);
  };

  return useFilter({
    title: "Collections",
    items: collections,
    filterFn,
  });
}
