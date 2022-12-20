import { FilterDef, ShowbizItem } from "../../../../@types";
import useShowTools from "../../../../hooks/useShowTools";
import { useCallback, useMemo, useState } from "react";
import useCollectionTools from "@hooks/useCollectionTools";

type FilterProps = {
  items: string[];
  title: string | null;
  filterFn: (show: ShowbizItem, filterValue: string) => boolean;
  defaultExpanded?: boolean;
  areValuesEditable?: boolean;
};

export function useFilter(props: FilterProps): FilterDef {
  const {
    title,
    items,
    filterFn,
    defaultExpanded,
    areValuesEditable = false,
  } = props;
  const { shows } = useShowTools();
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
  const { collections } = useCollectionTools();

  const handleClick = useCallback(
    (value: string) => {
      if (selectedValues.has(value)) {
        selectedValues.delete(value);
      } else {
        selectedValues.add(value);
      }
      setSelectedValues(new Set(selectedValues));
    },
    [selectedValues, collections]
  );

  const filteredShowsSet = useMemo(() => {
    if (!shows || selectedValues.size < 1 || !filterFn) return new Set(shows);
    const matchingShowsSet = new Set<ShowbizItem>();

    for (const show of shows) {
      for (const filter of selectedValues) {
        if (filterFn(show, filter)) {
          matchingShowsSet.add(show);
          break;
        }
      }
    }

    return matchingShowsSet;
  }, [selectedValues, shows, collections]);

  const handleDeselectAll = useCallback(() => {
    setSelectedValues(new Set());
  }, [selectedValues, collections]);

  const isValueSelected = (value: string) => {
    return !!selectedValues && selectedValues.has(value);
  };

  return {
    title,
    allValues: items,
    onClick: handleClick,
    onDeselectAll: handleDeselectAll,
    selectedValues,
    filteredShowsSet,
    defaultExpanded: Boolean(defaultExpanded),
    isValueSelected,
    areValuesEditable,
  };
}
