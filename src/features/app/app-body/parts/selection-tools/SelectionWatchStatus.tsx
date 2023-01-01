import React, { useCallback, useEffect, useMemo } from "react";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import FlagIcon from "@mui/icons-material/Flag";
import { Box, Menu } from "@mui/material";
import AppDropMenu, {
  AppMenuValueItem,
} from "@components/interactables/AppDropMenu";
import useMegaStore from "@store/MegaStore";
import useCollectionTools from "@hooks/useCollectionTools";
import AppDropButton from "@components/interactables/AppDropButton";
import WATCH_STATUS_VALUES from "@watch-status-utils/const";
import { useAsyncCallback } from "react-use-async-callback";
import { ClickEvent, ShowbizItem } from "@types";
import showContainsWatchStatus from "@watch-status-utils/showContainsWatchStatus";
import setWatchStatus from "@watch-status-utils/setWatchStatus";
import addShow from "@show-utils/addShow";
import getWatchStatusMenuItemList from "@watch-status-utils/getWatchStatusMenuItemList";
import setCustomDataList from "@custom-data-utils/setCustomDataList";
import megaStore from "@store/MegaStore";

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

  const [setWatchStatusesAsync] = useAsyncCallback(
    async (shows: ShowbizItem[], watchStatus: string) => {
      const promises: Promise<void>[] = [];
      shows.forEach((show) => promises.push(setWatchStatus(show, watchStatus)));
      await Promise.all(promises);

      // setCustomDataList(megaStore.getState().customDataList);
    },
    []
  );

  //
  // HANDLERS
  const onToggleValue = useCallback(
    (valueItem: AppMenuValueItem | undefined | null) => {
      if (!valueItem) return;

      // change values on all selected shows
      setWatchStatusesAsync(selectedShows, valueItem.value).catch();

      // update the selected show list in case
      // something has fallen out of the current filter
    },
    [addShow, toggleCollection, selectedShows, setWatchStatusesAsync]
  );
  const allEqualOrContain = useCallback(
    (valueItem: AppMenuValueItem) => {
      return selectedShows.every((show) =>
        showContainsWatchStatus(show, valueItem.value)
      );
    },
    [collections, selectedShows]
  );

  const anyEqualOrContain = useCallback(
    (valueItem: AppMenuValueItem) => {
      return selectedShows.some((show) =>
        showContainsWatchStatus(show, valueItem.value)
      );
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
          itemList={getWatchStatusMenuItemList(selectedShows)}
          allowEntry={false}
          title={"Watch Status"}
        />
      </Menu>
    </Box>
  );
}
