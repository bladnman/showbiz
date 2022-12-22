import { ShowbizItem } from "@types";
import showContainsGenre from "@show-utils/showContainsGenre";

export default function showsWithGenre(shows: ShowbizItem[], value: string) {
  return shows?.filter((show) => showContainsGenre(show, value)) ?? [];
}
