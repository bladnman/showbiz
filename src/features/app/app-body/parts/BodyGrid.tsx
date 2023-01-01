import React, { MouseEvent, useCallback } from "react";
import GroupByGrid from "./group-grid/GroupByGrid";
import useMegaStore from "../../../../store/MegaStore";
import { ShowbizItem } from "@types";
import ShowGrid from "@components/show-collections/ShowGrid";
import showSimilarShows from "@show-utils/showSimilarShows";
import toggleShowSelection from "@show-utils/toggleShowSelection";
import useBodyShows from "@hooks/useBodyShows";
import { COLORS } from "@features/app/app-theme/theme_const";
import { Box } from "@mui/material";

export default function BodyGrid() {
  const groupBy = useMegaStore((state) => state.bodyGroupBy);
  const shows = useBodyShows();
  const handleShowClick = useCallback(
    (show: ShowbizItem, _event?: MouseEvent<HTMLDivElement>) => {
      const isSelectMode = useMegaStore.getState().isSelectMode;
      // SELECT MODE
      if (isSelectMode) {
        toggleShowSelection(show);
      }

      // NORMAL MODE
      else {
        showSimilarShows(show);
      }
    },
    []
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flexGrow: 1,
        padding: 3,
        backgroundColor: COLORS.bg_back,
      }}
    >
      {groupBy ? (
        <GroupByGrid
          shows={shows}
          groupBy={groupBy}
          onClick={handleShowClick}
        />
      ) : (
        <ShowGrid shows={shows} onClick={handleShowClick} />
      )}
    </Box>
  );
}
