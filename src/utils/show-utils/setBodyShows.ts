import { ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function setBodyShows(shows: ShowbizItem[]) {
  const curBodyShows = useMegaStore.getState().bodyShows;

  // verify something has changed
  const hasChanged = (() => {
    if (!curBodyShows) return true;
    if (shows.length !== curBodyShows.length) return true;
    for (let i = 0; i < shows.length; i++) {
      if (shows[i] !== curBodyShows[i]) return true;
    }
    return false;
  })();

  if (hasChanged) {
    useMegaStore.setState({
      bodyShows: [...shows],
    });
  }
}
