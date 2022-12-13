import { ShowbizItem } from "../../../../@types";

export default function filterOrInSetAndBetween(
  sets: Set<ShowbizItem>[],
  shows: ShowbizItem[]
): Set<ShowbizItem> {
  if (!sets) return new Set();
  if (!shows) return new Set();
  const anyIsFiltered = sets.some((set) => set.size < shows.length);
  if (!anyIsFiltered) return new Set(shows);

  let outSet = new Set<ShowbizItem>();
  sets.forEach((set) => {
    // first set: keep all
    if (outSet.size < 1) {
      outSet = set;
    }

    // next sets: intersect
    else {
      outSet = new Set([...outSet].filter((show) => set.has(show)));
    }
  });

  return outSet;
}
