import { ShowbizItem } from "@types";

export default function getAllGenres(shows?: ShowbizItem[]): string[] {
  if (!shows?.length) return [];

  const set = new Set<string>();
  shows.forEach(
    (show) => show.genres && show.genres.forEach((genre) => set.add(genre.name))
  );
  return Array.from(set).sort();
}
