import { ShowbizItem } from "@types";

export default function getShowType(show: ShowbizItem): "movie" | "tv" | null {
  if (!show) return null;
  return show.isMovie ? "movie" : show.isTv ? "tv" : null;
}
