import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toggleSearchMode } from "@/utils/appUtils";

function ToolbarSearch() {
  return (
    <IconButton onClick={() => toggleSearchMode()}>
      <SearchIcon />
    </IconButton>
  );
}

export default ToolbarSearch;
