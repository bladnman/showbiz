import React from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { COLORS } from "@features/app/app-theme/theme_const";
import { ClickEvent, FilterDef } from "@types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import CollectionItemOptionsMenu from "@features/app/app-drawer/parts/CollectionItemOptionsMenu";
import {
  renameCollection,
  setCollectionToRename,
} from "@utils/collectionUtils";

type DrawerFilterRowProps = {
  value: string;
  filter: FilterDef;
};

export default function DrawerFilterRow({
  filter,
  value,
}: DrawerFilterRowProps) {
  const { onClick, isValueSelected, areValuesEditable } = filter;
  const popupState = usePopupState({
    variant: "popover",
    popupId: "item-options",
  });

  const onRenameClick = () => {
    popupState.close();
    setCollectionToRename(value);
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      gap={1}
      justifyContent={"space-between"}
    >
      <Button
        style={{ justifyContent: "flex-start" }}
        onClick={(event: ClickEvent) => {
          onClick?.({ event, item: value });
        }}
        size={"small"}
        fullWidth
      >
        <Stack
          direction={"row"}
          component={"div"}
          spacing={1.5}
          justifyContent={"space-between"}
          sx={{ width: "100%" }}
        >
          <Stack
            direction={"row"}
            component={"div"}
            spacing={1.5}
            alignItems={"center"}
            flexGrow={1}
          >
            <CircleIcon
              sx={{
                color: COLORS.callout,
                opacity: isValueSelected(value) ? 1.0 : 0,
                fontSize: "10px",
              }}
            />
            <Typography>{value}</Typography>
          </Stack>
        </Stack>
      </Button>
      {/*  TODO: put vert more button here for `areValuesEditable` filters only (rename/delete) */}
      {areValuesEditable && (
        <>
          <IconButton size={"small"} {...bindTrigger(popupState)}>
            <MoreVertIcon sx={{ opacity: 0.2 }} />
          </IconButton>
          <CollectionItemOptionsMenu
            popupState={popupState}
            onClick={onRenameClick}
          />
        </>
      )}
    </Stack>
  );
}
