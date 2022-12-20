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
    // return empty set - no shows means show no shows
    if (filteredShowSet.size === 0) return new Set();
    // if all shows are filtered, no need to filter with this set
    if (filteredShowSet.size === allShows.length) continue;
    // intersection of sets
    finalShowSet = new Set([...finalShowSet, ...filteredShowSet]);
  }

  return finalShowSet;
}
