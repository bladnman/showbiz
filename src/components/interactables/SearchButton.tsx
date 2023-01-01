import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import toggleSearchMode from "@app-utils/toggleSearchMode";

function SearchButton() {
  return (
    <IconButton onClick={() => toggleSearchMode()}>
      <SearchIcon fontSize={"medium"} sx={{ opacity: 0.6 }} />
    </IconButton>
  );
}

export default SearchButton;
