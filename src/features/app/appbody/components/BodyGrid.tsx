import GroupByGrid from "../../../../components/GroupByGrid";
import useMegaStore from "../../../../store/MegaStore";
import useBodyShows from "../../../../hooks/useBodyShows";
import { MouseEvent, useCallback, useMemo } from "react";
import { ShowbizItem } from "../../../../@types";
import { showSimilarShows } from "../../../../utils/itemUtils";
import ShowGrid from "../../../../components/ShowGrid";
import { getCustomDataListForShows } from "../../../../utils/customDataUtils";

export default function BodyGrid() {
  const bodyGroupBy = useMegaStore((state) => state.bodyGroupBy);
  const shows = useBodyShows();

  const customDataList = useMemo(() => {
    return getCustomDataListForShows(shows) ?? [];
  }, [shows]);

  const handleShowClick = useCallback(
    (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => {
      console.log(`[🐽](AppBody) show`, show);
      console.log(`[🐽](BodyGrid) event`, event);
      showSimilarShows(show);
    },
    []
  );

  // NO GROUP
  if (!bodyGroupBy) return <ShowGrid shows={shows} onClick={handleShowClick} />;

  return (
    <GroupByGrid
      shows={shows}
      customDataList={customDataList}
      groupBy={bodyGroupBy}
      onClick={handleShowClick}
    />
  );
}
