import { ShowbizItem } from "@types";
import { getReleaseDecade } from "@services/TMDB/utils/yearUtils";

export default function getAllDecades(shows: ShowbizItem[]): string[] {
  if (!shows?.length) return [];

  const set = new Set<string>();
  shows.forEach((show) => set.add(`${getReleaseDecade(show)}`));
  return Array.from(set).sort();
}
