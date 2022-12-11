import React from "react";
import { Box } from "@mui/material";
import useMegaStore from "../../../store/MegaStore";
import { COLORS } from "../apptheme/theme_const";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH_OPEN } from "../../../store/const";
import { DrawerHeader } from "../appdrawer/AppDrawer";
import BodyGrid from "./components/BodyGrid";
import BodyToolbar from "./components/BodyToolbar";

const MainBodyStyled = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => {
  const transitionDrawShow = theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  });
  const transitionDrawHide = theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  return {
    flexGrow: 1,
    backgroundColor: COLORS.bg_back,
    padding: theme.spacing(3),
    transition: transitionDrawHide,
    marginLeft: 0,
    ...(open && {
      transition: transitionDrawShow,
      marginLeft: `${DRAWER_WIDTH_OPEN}px`,
    }),
  };
});
const AppBody = () => {
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);

  return (
    <MainBodyStyled open={isDrawerOpen}>
      <Box>
        <DrawerHeader />
        <BodyToolbar sx={{ marginBottom: "1em" }} />
        <BodyGrid />
      </Box>
    </MainBodyStyled>
  );
};
export default AppBody;
