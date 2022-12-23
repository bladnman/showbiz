import React, { useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import { ClickEvent, ShowbizItem } from "@types";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { Box, Menu } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppDropMenu, { AppMenuValueItem } from "@components/AppDropMenu";
import useWatchStatusTools from "@hooks/useWatchStatusTools";
import { GLASS_BACKDROP_FILTER } from "@CONST";
import useShowTools from "@hooks/useShowTools";
import WATCH_STATUS_VALUES from "@watch-status-utils/const";
import sortAccordingToConstant from "@watch-status-utils/sortAccordingToConstant";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import getWatchStatusMenuItemList from "@watch-status-utils/getWatchStatusMenuItemList";
import setShowsToSelectHold from "@custom-data-utils/setShowsToSelectHold";

const DetailsWatchStatusButton = ({ show }: { show: ShowbizItem }) => {
  const { isShowSaved } = useShowTools();
  const { watchStatuses, getWatchStatus, setWatchStatus } =
    useWatchStatusTools();
  const currentValue = getWatchStatus(show, false);
  const currentLabel = getWatchStatus(show, true);

  const popupState = usePopupState({
    variant: "popover",
    popupId: "watchStatusOverflowMenu",
  });

  const onToggleValue = useCallback(
    (valueItem: AppMenuValueItem) => {
      setWatchStatus(show, valueItem.value).catch();
      popupState.close();
    },
    [show, popupState]
  );

  const doesEqualOrContain = (valueItem: AppMenuValueItem) => {
    return valueItem.value === currentValue;
  };

  if (!isShowSaved(show)) return null;
  return (
    <Box>
      <Button
        {...bindTrigger(popupState)}
        endIcon={
          popupState.isOpen ? (
            <ArrowDropUpIcon fontSize="large" />
          ) : (
            <ArrowDropDownIcon fontSize="large" />
          )
        }
        sx={{
          backdropFilter: GLASS_BACKDROP_FILTER,
        }}
      >
        {currentLabel}
      </Button>
      <Menu {...bindMenu(popupState)}>
        <AppDropMenu
          onToggleValue={onToggleValue}
          allEqualOrContain={doesEqualOrContain}
          itemList={getWatchStatusMenuItemList([show])}
          allowEntry={false}
          title={"Watch Status"}
        />
      </Menu>
    </Box>
  );
};

export default DetailsWatchStatusButton;
