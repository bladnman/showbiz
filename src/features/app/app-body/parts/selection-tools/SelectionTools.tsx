import React, { useEffect } from "react";
import { ButtonGroup, IconButton, Stack } from "@mui/material";
import { ShowbizItem, SxPropOpt } from "@types";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import useMegaStore from "@store/MegaStore";
import { COLORS } from "@features/app/app-theme/theme_const";
import useCollectionTools from "@hooks/useCollectionTools";
import SelectionCollections from "@features/app/app-body/parts/selection-tools/SelectionCollections";
import SelectionWatchStatus from "@features/app/app-body/parts/selection-tools/SelectionWatchStatus";
import SelectionRemove from "@features/app/app-body/parts/selection-tools/SelectionRemove";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import DeselectIcon from "@mui/icons-material/Deselect";
import { SelectReverseIcon } from "@/images/AppIcons";
import toggleSelectMode from "@app-utils/toggleSelectMode";
import selectShows from "@show-utils/selectShows";
import deselectShows from "@show-utils/deselectShows";
import useBreakSize from "@utils/useBreakSize";

export default function SelectionTools({ sx }: SxPropOpt) {
  const isSelectMode = useMegaStore((state) => state.isSelectMode);
  const currentlySelectedShows = useMegaStore((state) => state.selectedShows);
  const bodyShows = useMegaStore((state) => state.bodyShows);
  const isAnySelected = currentlySelectedShows.length > 0;
  const { collections } = useCollectionTools();
  const { isGtXs } = useBreakSize();
  const showSelectAll = isSelectMode && isGtXs;
  const showDeselectAll = isSelectMode && isAnySelected && isGtXs;
  const showInvertSelection = isSelectMode && isAnySelected && isGtXs;

  //
  // DE-SELECTOR
  // change selections when either shows or collections change
  useEffect(() => {
    // get our owm. don't bind on this since we are setting it again!
    const currentlySelectedShows = useMegaStore.getState().selectedShows;
    const toRemoveShows: ShowbizItem[] = [];
    currentlySelectedShows.forEach((show) => {
      if (!bodyShows.includes(show)) {
        toRemoveShows.push(show);
      }
    });
    deselectShows(toRemoveShows);
  }, [bodyShows, collections]);
  const handleInvertSelection = () => {
    const notSelectedShows = bodyShows.filter(
      (show) => !currentlySelectedShows.includes(show)
    );
    selectShows(notSelectedShows);
  };

  const selectOptionsButtonSx = {
    ":hover": {
      color: "white",
    },
    color: COLORS.dim,
  };
  const selectButtonSx = {
    ":hover": {
      color: "white",
      backgroundColor: isSelectMode ? COLORS.primary : "transparent",
    },
    color: isSelectMode ? "white" : COLORS.dim,
    backgroundColor: isSelectMode ? COLORS.primary : "transparent",
  };
  return (
    <Stack sx={{ ...sx }} direction={"row"} gap={1} alignItems={"center"}>
      {isSelectMode && <SelectionRemove />}
      {isSelectMode && <SelectionWatchStatus />}
      {isSelectMode && <SelectionCollections />}

      {/* SELECTION TOGGLE BUTTON */}
      <ButtonGroup
        // sx={{
        //   marginLeft: "2em",
        // border: "1px solid rgba(255,255,255,0.3)",
        // padding: "0.2em 1em",
        // backgroundColor: "rgba(0,0,0,0.5)",
        //}}
        variant={"outlined"}
      >
        {/* INVERT SELECTION */}
        {showInvertSelection && (
          <IconButton
            title={"Invert Selection"}
            onClick={() => handleInvertSelection()}
            sx={{
              ...selectOptionsButtonSx,
            }}
          >
            <SelectReverseIcon />
          </IconButton>
        )}
        {/* DESELECT ALL */}
        {showDeselectAll && (
          <IconButton
            title={"Deselect All"}
            onClick={() => deselectShows(bodyShows)}
            sx={{
              ...selectOptionsButtonSx,
            }}
          >
            <DeselectIcon />
          </IconButton>
        )}
        {/* SELECT ALL */}
        {showSelectAll && (
          <IconButton
            title={"Select All"}
            onClick={() => selectShows(bodyShows)}
            sx={{
              ...selectOptionsButtonSx,
            }}
          >
            <SelectAllIcon />
          </IconButton>
        )}

        {/* TOGGLE SELECT MODE */}
        <IconButton
          onClick={toggleSelectMode}
          sx={{
            ...selectButtonSx,
          }}
        >
          <HighlightAltIcon />
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
}
