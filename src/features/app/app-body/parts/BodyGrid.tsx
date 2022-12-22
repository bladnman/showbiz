import React, { MouseEvent, useCallback, useMemo } from "react";
import GroupByGrid from "./group-grid/GroupByGrid";
import useMegaStore from "../../../../store/MegaStore";
import useBodyShows from "../../../../hooks/useBodyShows";
import { ShowbizItem } from "@types";
import ShowGrid from "../../../../components/ShowGrid";
import useCollectionTools from "@hooks/useCollectionTools";
import getCustomDataListForShows from "@custom-data-utils/getCustomDataListForShows";
import showSimilarShows from "@show-utils/showSimilarShows";
import toggleShowSelection from "@show-utils/toggleShowSelection";

export default function BodyGrid() {
  const isSelectMode = useMegaStore((state) => state.isSelectMode);
  const bodyGroupBy = useMegaStore((state) => state.bodyGroupBy);
  const shows = useBodyShows();
  const { collections } = useCollectionTools();

  const customDataList = useMemo(() => {
    return getCustomDataListForShows(shows) ?? [];
  }, [shows, collections]);

  const handleShowClick = useCallback(
    (show: ShowbizItem, _event?: MouseEvent<HTMLDivElement>) => {
      // SELECT MODE
      if (isSelectMode) {
        toggleShowSelection(show);
      }

      // NORMAL MODE
      else {
        showSimilarShows(show);
      }
    },
    [isSelectMode]
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
