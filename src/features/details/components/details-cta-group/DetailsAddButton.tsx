import React, { useCallback } from "react";
import Button from "@mui/material/Button";
import { ClickEvent, ShowPropOpt } from "../../../../@types";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { COLORS } from "../../../app/apptheme/theme_const";
import {
  addShow,
  isShowInList,
  removeShow,
} from "../../../../store/utils/itemUtils";
import useMegaStore from "../../../../store/MegaStore";

const DetailsAddButton = ({ show = null }: ShowPropOpt) => {
  const shows = useMegaStore((state) => state.shows);
  const isSaved = isShowInList(show, shows);
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
    <Button
      onClick={handleButtonClick}
      variant="contained"
      endIcon={isSaved ? <DeleteIcon /> : <AddIcon />}
      sx={{ backgroundColor: isSaved ? COLORS.warn : COLORS.callout }}
    >
      {isSaved ? `REMOVE` : `ADD`}
    </Button>
  );
};

export default DetailsAddButton;
