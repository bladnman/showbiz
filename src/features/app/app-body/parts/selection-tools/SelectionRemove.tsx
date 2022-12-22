import React, { useCallback } from "react";
import { Box } from "@mui/material";
import useMegaStore from "@store/MegaStore";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { COLORS } from "@features/app/app-theme/theme_const";
import { useConfirm } from "material-ui-confirm";
import removeShows from "@show-utils/removeShows";

export default function SelectionRemove() {
  const selectedShows = useMegaStore((state) => state.selectedShows);
  const anySelected = selectedShows.length > 0;
  const confirm = useConfirm();

  // HANDLERS
  const handleClick = useCallback(() => {
    const message =
      selectedShows.length > 1 ? "Remove these shows?" : "Remove this show?";
    confirm({
      description: message,
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
      dialogProps: {
        maxWidth: "xs",
      },
      confirmationText: "Remove",
      cancellationText: "Cancel",
    })
      .then(() => {
        removeShows(selectedShows).then(() => {
          // we have deleted the shows, that implicitly
          // changes the active custom data
        });
      })
      .catch(() => {
        /* ... */
      });
  }, [selectedShows]);
  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="contained"
        disabled={!anySelected}
        sx={{
          backgroundColor: COLORS.warn,
        }}
      >
        <DeleteIcon />
      </Button>
    </Box>
  );
}
