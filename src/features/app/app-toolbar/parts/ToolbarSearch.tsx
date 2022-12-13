import React from "react";
import { alpha, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { toggleSearchMode } from "../../../../utils/appUtils";

const SearchStyled = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(Box)(({ theme }) => ({
  color: "inherit",
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "20ch",
  },
}));

function ToolbarSearch() {
  const handleSearchClick = () => toggleSearchMode();
  return (
    <SearchStyled onClick={handleSearchClick}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase>
        <Typography>Search…</Typography>
      </StyledInputBase>
    </SearchStyled>
  );
}

export default ToolbarSearch;
