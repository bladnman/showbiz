import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import toggleSearchMode from "@app-utils/toggleSearchMode";

function ToolbarSearch() {
  return (
    <IconButton onClick={() => toggleSearchMode()}>
      <SearchIcon />
    </IconButton>
  );
}

export default ToolbarSearch;
