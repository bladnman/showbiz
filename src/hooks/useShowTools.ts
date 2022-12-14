import { useCallback, useMemo } from "react";
import { addShow, isShowInList, updateShows } from "../utils/itemUtils";
import useMegaStore from "../store/MegaStore";
import { ShowbizItem } from "@/@types";

export default function useShowTools() {
  const shows = useMegaStore((state) => state.shows);
  const customDataList = useMegaStore((state) => state.customDataList);
  const isShowSaved = useCallback(
    (show: ShowbizItem | null) => {
      return isShowInList(show, shows);
    },
    [shows]
  );
  return useMemo(
    () => ({
      shows,
      customDataList,
      addShow,
      updateShows,
      isShowSaved,
    }),
    [shows]
  );
}
