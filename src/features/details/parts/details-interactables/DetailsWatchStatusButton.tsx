import React, { useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import { ShowbizItem } from "@types";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { Box, Menu } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AppDropMenu from "@components/AppDropMenu";
import useWatchStatusTools from "@hooks/useWatchStatusTools";
import { GLASS_BACKDROP_FILTER } from "@CONST";
import useShowTools from "@hooks/useShowTools";
import WATCH_STATUS_VALUES from "@watch-status-utils/const";
import sortAccordingToConstant from "@watch-status-utils/sortAccordingToConstant";

const DetailsWatchStatusButton = ({ show }: { show: ShowbizItem }) => {
  const { isShowSaved } = useShowTools();
  const isSaved = isShowSaved(show);
  const { watchStatuses, getWatchStatus, setWatchStatus } =
    useWatchStatusTools();
  const currentValue = getWatchStatus(show);

  const popupState = usePopupState({
    variant: "popover",
    popupId: "watchStatusOverflowMenu",
  });

  const valueOptions = useMemo(() => {
    const set = new Set<string>(watchStatuses);
    WATCH_STATUS_VALUES.forEach((option) => set.delete(option));
    const arr = Array.from(set).sort();
    return sortAccordingToConstant([...WATCH_STATUS_VALUES, ...arr]);
  }, [watchStatuses]);

  const onToggleValue = useCallback(
    (value: string) => {
      setWatchStatus(show, value);
      popupState.close();
    },
    [show, popupState]
  );

  const doesEqualOrContain = (value: string) => {
    return value === currentValue;
  };

  if (!isSaved) return null;
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
        {currentValue}
      </Button>
      <Menu {...bindMenu(popupState)}>
        <AppDropMenu
          onToggleValue={onToggleValue}
          allEqualOrContain={doesEqualOrContain}
          itemList={valueOptions}
          allowEntry={false}
          title={"Watch Status"}
        />
      </Menu>
    </Box>
  );
};

export default DetailsWatchStatusButton;
