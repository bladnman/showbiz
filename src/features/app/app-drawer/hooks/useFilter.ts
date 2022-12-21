import { ClickEvent, FilterDef, ShowbizItem } from "@types";
import useShowTools from "../../../../hooks/useShowTools";
import { useCallback, useEffect, useMemo, useState } from "react";
import useCollectionTools from "@hooks/useCollectionTools";

type FilterProps = {
  filterValues: string[];
  title: string | null;
  filterFn: (show: ShowbizItem, filterValue: string) => boolean;
  defaultExpanded?: boolean;
  areValuesEditable?: boolean;
};

export function useFilter(props: FilterProps): FilterDef {
  const {
    title,
    filterValues,
    filterFn,
    defaultExpanded,
    areValuesEditable = false,
  } = props;
  const { shows } = useShowTools();
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());
  const { collections } = useCollectionTools();

  const handleClick = useCallback(
    ({ item, event }: { item: string; title?: string; event?: ClickEvent }) => {
      const isMetaClick = event?.metaKey || event?.ctrlKey;
      const wasPreviouslySelected = selectedValues.has(item);

      // ADD TO SELECTION - meta-click
      if (isMetaClick) {
        if (wasPreviouslySelected) {
          selectedValues.delete(item);
        } else {
          selectedValues.add(item);
        }
      } else {
        const previousSelectionCount = selectedValues.size;
        // REPLACE SELECTION - no meta-click
        selectedValues.clear();
        if (!wasPreviouslySelected || previousSelectionCount > 1) {
          selectedValues.add(item);
        }
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

  // remove no longer valid "selected" values
  useEffect(() => {
    const validSelectedItems = filterValues.filter((item) =>
      selectedValues.has(item)
    );
    if (validSelectedItems.length !== selectedValues.size) {
      setSelectedValues(new Set(validSelectedItems));
    }
  }, [filterValues, selectedValues]);

  return {
    title,
    allValues: filterValues,
    onClick: handleClick,
    onDeselectAll: handleDeselectAll,
    selectedValues,
    filteredShowsSet,
    defaultExpanded: Boolean(defaultExpanded),
    isValueSelected,
    areValuesEditable,
  };
}
