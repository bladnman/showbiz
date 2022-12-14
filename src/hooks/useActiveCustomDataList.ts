import { useMemo } from "react";
import useMegaStore from "../store/MegaStore";

export default function useActiveCustomDataList() {
  /**
   * this is an unusual hook, but we keep old
   * custom data in the database in case you
   * remove then re-add the same show. but
   * we don't want to use values from the "removed shows"
   * when we create lists of things like all collections.
   *
   * This filters the customData objects down to only the
   * ones that have a matching show.
   */

  const shows = useMegaStore((state) => state.shows);
  const customDataList = useMegaStore((state) => state.customDataList);
  return useMemo(() => {
    return customDataList.filter((item) =>
      shows.find((show) => show.id === item.id)
    );
  }, [shows, customDataList]);
}
