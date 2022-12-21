import React, { useEffect } from "react";
import { ButtonGroup, IconButton, Stack } from "@mui/material";
import { ShowbizItem, SxPropOpt } from "@types";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import { toggleSelectMode } from "@utils/appUtils";
import useMegaStore from "@store/MegaStore";
import { COLORS } from "@features/app/app-theme/theme_const";
import useCollectionTools from "@hooks/useCollectionTools";
import { deselectShows } from "@utils/itemUtils";
import SelectionCollections from "@features/app/app-body/parts/selection-tools/SelectionCollections";
import SelectionWatchStatus from "@features/app/app-body/parts/selection-tools/SelectionWatchStatus";
import SelectionRemove from "@features/app/app-body/parts/selection-tools/SelectionRemove";

export default function SelectionTools({ sx }: SxPropOpt) {
  const isSelectMode = useMegaStore((state) => state.isSelectMode);
  const selectedShows = useMegaStore((state) => state.selectedShows);
  const anySelected = selectedShows.length > 0;
  const bodyShows = useMegaStore((state) => state.bodyShows);
  const { collections } = useCollectionTools();

  //
  // DE-SELECTOR
  // change selections when either shows or collections change
  useEffect(() => {
    const currentlySelectedShows = useMegaStore.getState().selectedShows;
    const toRemoveShows: ShowbizItem[] = [];
    currentlySelectedShows.forEach((show) => {
      if (!bodyShows.includes(show)) {
        toRemoveShows.push(show);
      }
    });
    deselectShows(toRemoveShows);
  }, [bodyShows, collections]);

  return (
    <Stack sx={{ ...sx }} direction={"row"} gap={1} alignItems={"center"}>
      {isSelectMode && <SelectionRemove />}
      {isSelectMode && <SelectionWatchStatus />}
      {isSelectMode && <SelectionCollections />}

      {/* SELECTION TOGGLE BUTTON */}
      <ButtonGroup variant="text">
        <IconButton
          onClick={toggleSelectMode}
          sx={{
            ":hover": {
              backgroundColor: isSelectMode ? COLORS.primary : "transparent",
              color: "white",
            },
            backgroundColor: isSelectMode ? COLORS.primary : "transparent",
          }}
        >
          <HighlightAltIcon />
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
}
