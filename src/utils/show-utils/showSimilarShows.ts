import { ShowbizItem } from "@types";
import setDetailItem from "@show-utils/setDetailItem";
import setIsDetailsOpen from "@show-utils/setIsDetailsOpen";
import setSimilarToShow from "@show-utils/setSimilarToShow";

export default function showSimilarShows(show: ShowbizItem | null) {
  if (!show) return;
  setSimilarToShow(show);
  setDetailItem(show);
  setIsDetailsOpen(true);
}
