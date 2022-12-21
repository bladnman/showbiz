import { ShowbizItem } from "../../../../@types";

export default function filterOrInSetAndBetween(
  sets: Set<ShowbizItem>[],
  allShows: ShowbizItem[]
): Set<ShowbizItem> {
  if (!sets) return new Set();
  if (!allShows) return new Set();
  const anyIsFiltered = sets.some((set) => set.size < allShows.length);
  if (!anyIsFiltered) return new Set(allShows);

  let finalShowSet = new Set<ShowbizItem>();
  for (let i = 0; i < sets.length; i++) {
    const filteredShowSet = sets[i];
    //
    // first filtered set we just add all items to final set
    if (i === 0) finalShowSet = filteredShowSet;
    //
    // return empty set - no shows means show no shows
    else if (filteredShowSet.size === 0) return new Set();
    //
    // if all shows are filtered, no need to filter with this set
    else if (filteredShowSet.size === allShows.length) continue;
    //
    // intersection of sets
    else
      finalShowSet = new Set(
        [...finalShowSet].filter((show) => filteredShowSet.has(show))
      );
  }

  return finalShowSet;
}
