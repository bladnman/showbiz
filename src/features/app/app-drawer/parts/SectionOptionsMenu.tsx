import React from "react";
import { bindMenu, PopupState } from "material-ui-popup-state/hooks";
import { ListItemText, Menu, MenuItem } from "@mui/material";

type OptionsMenuProps = {
  popupState: PopupState;
  onDeselectAll?: () => void;
};

export default function SectionOptionsMenu({
  popupState,
  onDeselectAll,
}: OptionsMenuProps) {
  return (
    <Menu {...bindMenu(popupState)}>
      <MenuItem
        onClick={() => {
          onDeselectAll?.();
          popupState.close();
        }}
      >
        <ListItemText>Deselect all</ListItemText>
      </MenuItem>
    </Menu>
  );
}
