import React, { useCallback, useMemo } from "react";
import Button from "@mui/material/Button";
import { ClickEvent, ShowbizItem, ShowPropOpt } from "@types";
import { COLORS } from "../../../app/app-theme/theme_const";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { Box, ButtonGroup, Menu } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import useShowTools from "@hooks/useShowTools";
import AppDropMenu, { AppMenuValueItem } from "@components/AppDropMenu";
import useCollectionTools from "@hooks/useCollectionTools";
import { useAsyncCallback } from "react-use-async-callback";
import showContainsCollection from "@collection-utils/showContainsCollection";
import addShow from "@show-utils/addShow";
import removeShow from "@show-utils/removeShow";
import WATCH_STATUS_VALUES from "@watch-status-utils/const";
import sortAccordingToConstant from "@watch-status-utils/sortAccordingToConstant";

const DetailsAddButton = ({ show = null }: ShowPropOpt) => {
  const { isShowSaved } = useShowTools();
  const isSaved = isShowSaved(show);
  const { collections, toggleCollection } = useCollectionTools();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "ctaOverflowMenu",
  });

  const [toggleValueAsync] = useAsyncCallback(
    async (show: ShowbizItem, value: string) => {
      await addShow(show);
      // then change collection values
      await toggleCollection(show, value);
    },
    []
  );

  const handleAddRemoveButtonClick = useCallback(
    (event: ClickEvent) => {
      if (isSaved) {
        removeShow(show).catch();
      } else {
        addShow(show).catch();
      }
      event.stopPropagation();
    },
    [show, isSaved]
  );
  const onToggleValue = useCallback(
    (valueItem: AppMenuValueItem | undefined | null) => {
      if (!valueItem || !show) return;
      toggleValueAsync(show, valueItem.value).catch();
    },
    [show, addShow]
  );
  const allEqualOrContain = useCallback(
    (valueItem: AppMenuValueItem) => {
      return showContainsCollection(show, valueItem.value);
    },
    [show]
  );

  const valueOptions: AppMenuValueItem[] = useMemo(() => {
    return collections.map((item) => {
      return {
        value: item,
      };
    });
  }, [collections]);

  if (!show) return null;

  return (
    <Box flex={1} sx={{ display: "flex" }}>
      <ButtonGroup sx={{ flexGrow: 1 }}>
        <Button
          onClick={handleAddRemoveButtonClick}
          variant="contained"
          endIcon={isSaved ? <DeleteIcon /> : <AddIcon />}
          sx={{
            backgroundColor: isSaved ? COLORS.warn : COLORS.callout,
            flexGrow: 1,
          }}
        >
          {isSaved ? `REMOVE` : `ADD`}
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            color: COLORS.bg_back,
            backgroundColor: isSaved ? COLORS.warn : COLORS.callout,
          }}
          {...bindTrigger(popupState)}
        >
          <LocalOfferIcon fontSize="medium" />
        </Button>
        <Menu {...bindMenu(popupState)}>
          <AppDropMenu
            onToggleValue={onToggleValue}
            allEqualOrContain={allEqualOrContain}
            itemList={valueOptions}
            allowEntry={true}
            title={"Collections"}
          />
        </Menu>
      </ButtonGroup>
    </Box>
  );
};

export default DetailsAddButton;
