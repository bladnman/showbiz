import setDetailItem from "@show-utils/setDetailItem";
import setIsDetailsOpen from "@show-utils/setIsDetailsOpen";
import setSimilarToShow from "@show-utils/setSimilarToShow";
import setSearchQuery from "@search-utils/setSearchQuery";

export default function showSearchFor(keyword: string | null) {
  // if (!keyword) return;
  setSimilarToShow(null);
  setDetailItem(null);
  setSearchQuery(keyword);
  setIsDetailsOpen(true);
}
