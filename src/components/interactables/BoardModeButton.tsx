import React from "react";
import { IconButton } from "@mui/material";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import setBodyBoardName from "@app-utils/setBodyBoardName";
import useMegaStore from "@store/MegaStore";
import { COLORS } from "@features/app/app-theme/theme_const";

export default function BoardModeButton() {
  const bodyBoardName = useMegaStore((state) => state.bodyBoardName);
  const isBoardMode = !!bodyBoardName;
  const selectButtonSx = {
    ":hover": {
      color: "white",
      backgroundColor: isBoardMode ? COLORS.primary : "transparent",
    },
    color: isBoardMode ? "white" : COLORS.dim,
    backgroundColor: isBoardMode ? COLORS.primary : "transparent",
  };
  return (
    <IconButton
      sx={selectButtonSx}
      onClick={() =>
        setBodyBoardName(isBoardMode ? undefined : "TEMPORARY BOARD NAME")
      }
    >
      <WebStoriesIcon opacity={isBoardMode ? 1.0 : 0.6} />
    </IconButton>
  );
}
