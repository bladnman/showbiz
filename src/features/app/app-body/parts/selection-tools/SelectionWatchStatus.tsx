import React, { useCallback, useEffect } from "react";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import FlagIcon from "@mui/icons-material/Flag";
import { Box, Menu } from "@mui/material";
import AppDropMenu from "@components/AppDropMenu";
import useMegaStore from "@store/MegaStore";
import useCollectionTools from "@hooks/useCollectionTools";
import { addShow } from "@utils/itemUtils";
import AppDropButton from "@components/AppDropButton";
import {
  setWatchStatus,
  showContainsWatchStatus,
  WATCH_STATUS_VALUES,
} from "@utils/watchStatusUtils";

export default function SelectionWatchStatus() {
  const selectedShows = useMegaStore((state) => state.selectedShows);
  const anySelected = selectedShows.length > 0;
  const { collections, toggleCollection } = useCollectionTools();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "ctaOverflowMenu",
  });

  //
  // CLOSE POPUPS WHEN NOTHING SELECTED
  useEffect(() => {
    !anySelected && popupState.close();
  }, [anySelected]);

  //
  // HANDLERS
  const onToggleValue = useCallback(
    (value: string | undefined | null) => {
      if (!value) return;

      // change values on all selected shows
      selectedShows.forEach((show) => setWatchStatus(show, value));

      // update the selected show list in case
      // something has fallen out of the current filter
    },
    [addShow, toggleCollection, selectedShows]
  );
  const allEqualOrContain = useCallback(
    (value: string) => {
      return selectedShows.every((show) =>
        showContainsWatchStatus(show, value)
      );
    },
    [collections, selectedShows]
  );

  const anyEqualOrContain = useCallback(
    (value: string) => {
      return selectedShows.some((show) => showContainsWatchStatus(show, value));
    },
    [collections, selectedShows]
  );
  return (
    <Box>
      <AppDropButton
        isOpen={popupState.isOpen}
        {...bindTrigger(popupState)}
        disabled={!anySelected}
      >
        <FlagIcon fontSize="medium" />
      </AppDropButton>

      <Menu {...bindMenu(popupState)}>
        <AppDropMenu
          onToggleValue={onToggleValue}
          allEqualOrContain={allEqualOrContain}
          anyEqualOrContain={anyEqualOrContain}
          itemList={WATCH_STATUS_VALUES}
          allowEntry={false}
          title={"Watch Status"}
        />
      </Menu>
    </Box>
  );
}
