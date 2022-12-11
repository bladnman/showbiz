import { useMemo } from "react";
import { addShow, updateShows } from "../utils/itemUtils";
import useMegaStore from "../store/MegaStore";

export default function useShowTools() {
  const shows = useMegaStore((state) => state.shows);
  const customDataList = useMegaStore((state) => state.customDataList);
  return useMemo(
    () => ({
      shows,
      customDataList,
      addShow,
      updateShows,
    }),
    [shows]
  );
}
