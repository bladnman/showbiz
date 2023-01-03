import React from "react";
import ShowBoard from "@components/show-collections/ShowBoard";
import useBodyShows from "@hooks/useBodyShows";
import { Box } from "@mui/material";
import { useDisableNavScroll } from "@hooks/useDisableNavScroll";
import useBoardConfig from "@components/show-collections/hooks/useBoardConfig";
import NotFoundTile from "@components/tiles/NotFoundTile";
import useMegaStore from "@store/MegaStore";

export default function BodyBoard() {
  const shows = useBodyShows();
  const bodyBoardId = useMegaStore((state) => state.bodyBoardId);
  const boardConfig = useBoardConfig(bodyBoardId, shows);

  useDisableNavScroll();

  // no items
  if (!boardConfig?.items.length) return <NotFoundTile />;

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
      <ShowBoard board={boardConfig} />
    </Box>
  );
}
