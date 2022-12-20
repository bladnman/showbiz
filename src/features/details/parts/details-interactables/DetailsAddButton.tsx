import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { ClickEvent, ShowPropOpt } from "@types";
import { COLORS } from "../../../app/app-theme/theme_const";
import { addShow, removeShow } from "@utils/itemUtils";
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
import AppDropMenu from "@components/AppDropMenu";
import useCollectionTools from "@hooks/useCollectionTools";
import { showContainsCollection } from "@utils/collectionUtils";

const DetailsAddButton = ({ show = null }: ShowPropOpt) => {
  const { isShowSaved } = useShowTools();
  const isSaved = isShowSaved(show);
  const { collections, toggleCollection, getCollectionsForShow } =
    useCollectionTools();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "ctaOverflowMenu",
  });

  const handleButtonClick = useCallback(
    (event: ClickEvent) => {
      if (isSaved) {
        removeShow(show);
      } else {
        addShow(show);
      }
      event.stopPropagation();
    },
    [show, isSaved]
  );
  const onToggleValue = useCallback(
    (value: string | undefined | null) => {
      if (!value || !show) return;
      // add the show first (in case it's new)
      addShow(show);
      // then change collection values
      toggleCollection(show, value);
      // focusOnField();
    },
    [show, addShow]
  );
  const doesEqualOrContain = useCallback(
    (value: string) => {
      return showContainsCollection(show, value);
    },
    [show]
  );

  if (!show) return null;

  return (
    <Box flex={1} sx={{ display: "flex" }}>
      <ButtonGroup sx={{ flexGrow: 1 }}>
        <Button
          onClick={handleButtonClick}
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
            allEqualOrContain={doesEqualOrContain}
            itemList={collections}
            allowEntry={true}
            title={"Collections"}
          />
        </Menu>
      </ButtonGroup>
    </Box>
  );
};

export default DetailsAddButton;
