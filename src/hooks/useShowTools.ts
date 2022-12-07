import { useMemo } from "react";
import { ShowbizItem } from "../@types";
import useFullShow from "./useFullShow";
import useShows from "./useShows";
import { addShow, updateShows } from "../store/utils/itemUtils";

export default function useShowTools(withShow?: ShowbizItem | null) {
  const shows = useShows();
  const show = useFullShow(withShow);
  return useMemo(
    () => ({
      show,
      shows,
      addShow,
      updateShows,
    }),
    [show, shows]
  );
}
