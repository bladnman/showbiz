import React, { useCallback, useEffect } from "react";
import { ButtonGroup, IconButton, Menu, Stack } from "@mui/material";
import { ShowbizItem, SxPropOpt } from "@types";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import { toggleSelectMode } from "@utils/appUtils";
import useMegaStore from "@/store/MegaStore";
import { COLORS } from "@features/app/app-theme/theme_const";
import Button from "@mui/material/Button";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AppDropMenu from "@components/AppDropMenu";
import useCollectionTools from "@hooks/useCollectionTools";
import { addShow, deselectShows } from "@utils/itemUtils";
import { showContainsCollection } from "@utils/collectionUtils";

export default function SelectionTools({ sx }: SxPropOpt) {
  const isSelectMode = useMegaStore((state) => state.isSelectMode);
  const selectedShows = useMegaStore((state) => state.selectedShows);
  const bodyShows = useMegaStore((state) => state.bodyShows);
  const anySelected = selectedShows.length > 0;

  const { collections, toggleCollection } = useCollectionTools();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "ctaOverflowMenu",
  });

  // CLEAN SELECTED SHOWS WHEN BODY SHOWS CHANGE
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

  // CLOSE POPUPS WHEN NOTHING SELECTED
  useEffect(() => {
    !anySelected && popupState.close();
  }, [anySelected]);

  const onToggleValue = useCallback(
    (value: string | undefined | null) => {
      if (!value) return;

      // change values on all selected shows
      selectedShows.forEach((show) => toggleCollection(show, value));

      // update the selected show list in case
      // something has fallen out of the current filter
    },
    [addShow, toggleCollection, selectedShows]
  );
  const allEqualOrContain = useCallback(
    (value: string) => {
      return selectedShows.every((show) => showContainsCollection(show, value));
    },
    [collections, selectedShows]
  );

  const anyEqualOrContain = useCallback(
    (value: string) => {
      return selectedShows.some((show) => showContainsCollection(show, value));
    },
    [collections, selectedShows]
  );

  return (
    <Stack sx={{ ...sx }} direction={"row"} gap={1} alignItems={"center"}>
      {anySelected && (
        <>
          <Button
            size="small"
            variant="contained"
            sx={{
              color: COLORS.bg_back,
              backgroundColor: COLORS.callout,
            }}
            {...bindTrigger(popupState)}
          >
            <LocalOfferIcon fontSize="medium" />
          </Button>
          <Menu {...bindMenu(popupState)}>
            <AppDropMenu
              onToggleValue={onToggleValue}
              allEqualOrContain={allEqualOrContain}
              anyEqualOrContain={anyEqualOrContain}
              itemList={collections}
              allowEntry={true}
              title={"Collections"}
            />
          </Menu>
        </>
      )}

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
