import { ShowbizItem } from "@types";
import getShowType from "@show-utils/getShowType";

export default function getAllShowTypes(shows: ShowbizItem[]): string[] {
  if (!shows?.length) return [];

  const set = new Set<string>();
  shows.forEach((show) => {
    const type = getShowType(show);
    if (type) set.add(type);
  });
  return Array.from(set).sort();
}
