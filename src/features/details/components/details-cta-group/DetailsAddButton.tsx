import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { ClickEvent, ShowPropOpt } from "../../../../@types";
import { COLORS } from "../../../app/apptheme/theme_const";
import { addShow, isShowInList, removeShow } from "../../../../utils/itemUtils";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { Box, ButtonGroup, Menu } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DetailsCollectionMenu from "../details-collection-menu/DetailsCollectionMenu";
import useShowTools from "../../../../hooks/useShowTools";

const DetailsAddButton = ({ show = null }: ShowPropOpt) => {
  const { shows } = useShowTools();
  const isSaved = isShowInList(show, shows);

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
          <DetailsCollectionMenu onClose={popupState.close} show={show} />
        </Menu>
      </ButtonGroup>
    </Box>
  );
};

export default DetailsAddButton;
