import { CustomDataItem, GroupByDef, ShowbizItem, ShowGroup } from "@types";
import { useMemo } from "react";
import getCollectionGroupByDef from "@features/app/app-body/parts/group-grid/utils/getCollectionGroupByDef";
import getGenreGroupByDef from "@features/app/app-body/parts/group-grid/utils/getGenreGroupByDef";
import getStatusGroupByDef from "@features/app/app-body/parts/group-grid/utils/getStatusGroupByDef";
import sortShowsByRating from "@show-utils/shortShowsByRating";
import sortShowsByHoldDate from "@show-utils/shortShowsByHoldDate";

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
      case "STATUS":
        return getStatusGroupByDef({
          customDataList,
          shows: sortShowsByHoldDate(sortShowsByRating(shows)) ?? [],
        });
    }
    return {
      title: groupBy ?? "",
      showGroups: [] as ShowGroup[],
    };
  }, [customDataList, shows, groupBy]);
}
