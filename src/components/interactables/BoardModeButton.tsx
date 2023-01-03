import React from "react";
import { IconButton } from "@mui/material";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import setBodyBoardId from "@app-utils/setBodyBoardId";
import useMegaStore from "@store/MegaStore";
import { COLORS } from "@features/app/app-theme/theme_const";

export default function BoardModeButton() {
  const bodyBoardName = useMegaStore((state) => state.bodyBoardId);
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
      onClick={() => setBodyBoardId(isBoardMode ? undefined : 1)}
    >
      <WebStoriesIcon opacity={isBoardMode ? 1.0 : 0.6} />
    </IconButton>
  );
}
