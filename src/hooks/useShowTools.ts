import { useCallback, useMemo } from "react";
import {
  addShow,
  isShowInList,
  updateShows,
  updateShowInCloud,
} from "@utils/itemUtils";
import useMegaStore from "../store/MegaStore";
import { ShowbizItem } from "@/@types";

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
  const isShowSelected = useCallback(
    (show: ShowbizItem) => {
      if (!show) return false;
      const selectedShows = useMegaStore.getState().selectedShows;
      return !!selectedShows.find((item) => item.id === show.id);
    },
    [selectedShows]
  );

  return useMemo(
    () => ({
      shows,
      customDataList,
      addShow,
      updateShows,
      isShowSaved,
      updateShowInCloud,
      selectedShows,
      isShowSelected,
    }),
    [shows]
  );
}
