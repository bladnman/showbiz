import { Movie, Tv, Person } from "../../TMDB/types";
import useMegaStore from "../MegaStore";

export function setDetailItem(item: Movie | Tv | Person | null) {
  useMegaStore.setState({
    detailItem: item,
  });
}
