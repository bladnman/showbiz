import React, { MouseEvent, useCallback } from "react";
import { ShowbizItem } from "@types";
import ShowBoard from "@components/show-collections/ShowBoard";
import useBodyShows from "@hooks/useBodyShows";
import { COLORS } from "@features/app/app-theme/theme_const";
import { Box } from "@mui/material";
import { useDisableNavScroll } from "@hooks/useDisableNavScroll";

export default function BodyBoard() {
  const shows = useBodyShows();
  useDisableNavScroll();
  const handleShowClick = useCallback(
    (show: ShowbizItem, _event?: MouseEvent<HTMLDivElement>) => {
      console.log(`[🐽](BodyBoard.tsx) ouch`); // ! remove me
    },
    []
  );

  return (
    <Box
      className={"BODY-BOARD"}
      sx={{
        width: "100%",
        height: "100%",
        flexGrow: 1,
        backgroundColor: "#353c35",
        overflow: "hidden",
        overscrollBehaviorX: "contain",
      }}
    >
      <ShowBoard shows={shows} onClick={handleShowClick} />
    </Box>
  );
}
