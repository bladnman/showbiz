import { FilterDef, ShowbizItem } from "@types";
import { useFilter } from "./useFilter";
import useShowTypes from "../../../../hooks/useShowTypes";
import getShowType from "@show-utils/getShowType";

export function useShowTypeFilter(shows: ShowbizItem[]): FilterDef {
  const types = useShowTypes(shows);

  const filterFn = (show: ShowbizItem, filterValue: string) => {
    return getShowType(show) === filterValue;
  };

  return useFilter({
    title: "Type",
    filterValues: types,
    filterFn,
  });
}
