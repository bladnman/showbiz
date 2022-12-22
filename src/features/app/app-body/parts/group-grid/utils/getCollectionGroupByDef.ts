import { CustomDataItem, GroupByDef, ShowbizItem } from "@types";
import getAllCollections from "@collection-utils/getAllCollections";
import showContainsCollection from "@collection-utils/showContainsCollection";
import showHasCollections from "@collection-utils/showHasCollections";

export default function getCollectionGroupByDef({
  customDataList,
  shows,
}: {
  customDataList: CustomDataItem[];
  shows: ShowbizItem[];
}): GroupByDef {
  const groupValues = getAllCollections(customDataList);
  const showGroups = groupValues.map((groupValue) => {
    const matchingShows =
      shows.filter((show) => showContainsCollection(show, groupValue)) ?? [];
    return {
      title: groupValue,
      shows: matchingShows,
    };
  });
  const uncollectedShows =
    shows.filter((show) => !showHasCollections(show)) ?? [];
  if (uncollectedShows.length > 0) {
    showGroups.push({
      title: "Uncollected",
      shows: uncollectedShows,
    });
  }

  return {
    title: "Collections",
    showGroups,
  };
}
