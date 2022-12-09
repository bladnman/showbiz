import { Filter, ShowbizItem } from "../../../../@types";
import useShowTools from "../../../../hooks/useShowTools";
import { useCallback, useMemo, useState } from "react";

type FilterProps = {
  items: string[];
  title: string | null;
  filterFn: (show: ShowbizItem, filterValue: string) => boolean;
};

export function useFilter(props: FilterProps): Filter {
  const { title, items, filterFn } = props;
  const { shows } = useShowTools();
  const [filters, setFilters] = useState<Set<string>>(new Set());

  const handleClick = useCallback(
    (value: string) => {
      if (filters.has(value)) {
        filters.delete(value);
      } else {
        filters.add(value);
      }
      setFilters(new Set(filters));
    },
    [filters]
  );

  const filteredShowsSet = useMemo(() => {
    if (!shows || filters.size < 1 || !filterFn) return new Set(shows);

    let matchingShowsSet = new Set<ShowbizItem>();

    for (const show of shows) {
      for (const filter of filters) {
        if (filterFn(show, filter)) {
          matchingShowsSet.add(show);
          break;
        }
      }
    }

    return matchingShowsSet;
  }, [filters, shows]);

  return {
    title,
    items,
    onClick: handleClick,
    filters,
    filteredShowsSet,
  };
}
