import { FilterDef, ShowbizItem } from "../../../../@types";
import useShowTools from "../../../../hooks/useShowTools";
import { useCallback, useMemo, useState } from "react";

type FilterProps = {
  items: string[];
  title: string | null;
  filterFn: (show: ShowbizItem, filterValue: string) => boolean;
  defaultExpanded?: boolean;
};

export function useFilter(props: FilterProps): FilterDef {
  const { title, items, filterFn, defaultExpanded } = props;
  const { shows } = useShowTools();
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());

  const handleClick = useCallback(
    (value: string) => {
      if (selectedValues.has(value)) {
        selectedValues.delete(value);
      } else {
        selectedValues.add(value);
      }
      setSelectedValues(new Set(selectedValues));
    },
    [selectedValues]
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
  }, [selectedValues, shows]);

  const handleDeselectAll = useCallback(() => {
    setSelectedValues(new Set());
  }, [selectedValues]);

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
  };
}
