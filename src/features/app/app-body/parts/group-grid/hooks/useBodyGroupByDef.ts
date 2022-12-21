import { CustomDataItem, GroupByDef, ShowbizItem, ShowGroup } from "@types";
import { useMemo } from "react";
import getCollectionGroupByDef from "@features/app/app-body/parts/group-grid/utils/getCollectionGroupByDef";
import getGenreGroupByDef from "@features/app/app-body/parts/group-grid/utils/getGenreGroupByDef";

export default function useBodyGroupByDef({
  customDataList,
  shows,
  groupBy,
}: {
  customDataList: CustomDataItem[];
  shows?: ShowbizItem[];
  groupBy?: string;
}): GroupByDef {
  return useMemo(() => {
    switch (groupBy?.toUpperCase()) {
      case "GENRE":
        return getGenreGroupByDef({
          shows: shows ?? [],
        });
      case "COLLECTION":
        return getCollectionGroupByDef({
          customDataList,
          shows: shows ?? [],
        });
    }
    return {
      title: groupBy ?? "",
      showGroups: [] as ShowGroup[],
    };
  }, [customDataList, shows, groupBy]);
}
