import { ShowbizItem } from "@types";

export default function showContainsGenre(show: ShowbizItem, genre: string) {
  if (!show) return false;
  const foundItem = show.genres?.find(
    (showGenre) => showGenre.name.toLowerCase() === genre.toLowerCase()
  );
  return !!foundItem;
}
