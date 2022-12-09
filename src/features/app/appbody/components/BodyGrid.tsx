import GroupByGrid from "../../../../components/GroupByGrid";
import useMegaStore from "../../../../store/MegaStore";
import useBodyShows from "../../../../hooks/useBodyShows";
import { MouseEvent, useCallback } from "react";
import { ShowbizItem } from "../../../../@types";
import { showSimilarShows } from "../../../../store/utils/itemUtils";
import ShowGrid from "../../../../components/ShowGrid";

export default function BodyGrid() {
  const bodyGroupBy = useMegaStore((state) => state.bodyGroupBy);
  const shows = useBodyShows();
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
      groupBy={bodyGroupBy}
      onClick={handleShowClick}
    />
  );
}
