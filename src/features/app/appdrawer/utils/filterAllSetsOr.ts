import { ShowbizItem } from "../../../../@types";

export default function filterAllSetsOr(
  sets: Set<ShowbizItem>[],
  shows: ShowbizItem[]
): Set<ShowbizItem> {
  if (!sets) return new Set();
  if (!shows) return new Set();
  const anyIsFiltered = sets.some((set) => set.size < shows.length);
  if (!anyIsFiltered) return new Set(shows);

  let outSet = new Set<ShowbizItem>();
  sets.forEach((set) => {
    if (set.size < shows.length) {
      outSet = new Set([...outSet, ...set]);
    }
  });
  return outSet;
}
