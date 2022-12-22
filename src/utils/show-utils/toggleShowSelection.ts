import { ShowbizItem } from "@types";
import isShowSelected from "@show-utils/isShowSelected";
import removeFromSelectedShows from "@show-utils/removeFromSelectedShows";
import addToSelectedShows from "@show-utils/addToSelectedShows";

export default function toggleShowSelection(show: ShowbizItem) {
  if (isShowSelected(show)) {
    removeFromSelectedShows(show);
  } else {
    addToSelectedShows(show);
  }
}
