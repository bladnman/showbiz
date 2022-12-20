import React from "react";
import { bindMenu, PopupState } from "material-ui-popup-state/hooks";
import { ClickAwayListener, ListItemText, Menu, MenuItem } from "@mui/material";

type CollectionItemOptionsMenuProps = {
  popupState: PopupState;
  onClick?: () => void;
};

export default function CollectionItemOptionsMenu({
  popupState,
  onClick,
}: CollectionItemOptionsMenuProps) {
  return (
    <Menu {...bindMenu(popupState)}>
      <MenuItem
        onClick={() => {
          popupState.close();
          onClick?.();
        }}
      >
        <ListItemText>Rename collection</ListItemText>
      </MenuItem>
    </Menu>
  );
}
