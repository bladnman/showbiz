import { useMemo } from "react";
import { addShow, updateShows } from "../store/utils/itemUtils";
import useMegaStore from "../store/MegaStore";

export default function useShowTools() {
  const shows = useMegaStore((state) => state.shows);
  return useMemo(
    () => ({
      shows,
      addShow,
      updateShows,
    }),
    [shows]
  );
}
