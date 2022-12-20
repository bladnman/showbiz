import React, { MouseEvent, useCallback, useMemo } from "react";
import GroupByGrid from "../../../../components/GroupByGrid";
import useMegaStore from "../../../../store/MegaStore";
import useBodyShows from "../../../../hooks/useBodyShows";
import { ShowbizItem } from "@types";
import { showSimilarShows, toggleShowSelection } from "@utils/itemUtils";
import ShowGrid from "../../../../components/ShowGrid";
import { getCustomDataListForShows } from "@utils/customDataUtils";
import useCollectionTools from "@hooks/useCollectionTools";

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
