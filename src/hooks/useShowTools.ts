import { useCallback, useMemo } from "react";
import useMegaStore from "../store/MegaStore";
import { ShowbizItem } from "@/@types";
import isShowInList from "@show-utils/isShowInList";
import addShow from "@show-utils/addShow";
import updateShows from "@show-utils/updateShows";
import updateShow from "@show-utils/updateShow";

export default function useShowTools() {
  const shows = useMegaStore((state) => state.shows);
  const customDataList = useMegaStore((state) => state.customDataList);
  const selectedShows = useMegaStore((state) => state.selectedShows);
  const isShowSaved = useCallback(
    (show?: ShowbizItem | null) => {
      return isShowInList(show, shows);
    },
    [shows]
  );
  const isShowSelected = useCallback((show: ShowbizItem) => {
    if (!show) return false;
    const selectedShows = useMegaStore.getState().selectedShows;
    return !!selectedShows.find((item) => item.id === show.id);
  }, []);

  return useMemo(
    () => ({
      shows,
      customDataList,
      addShow,
      updateShow,
      updateShows,
      isShowSaved,
      selectedShows,
      isShowSelected,
    }),
    [shows, customDataList, isShowSaved, isShowSelected, selectedShows]
  );
}
