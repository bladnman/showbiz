import React from "react";
import useMegaStore from "../../../store/MegaStore";
import { COLORS } from "../app-theme/theme_const";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH_OPEN } from "../../../store/const";
import { DrawerHeaderStyled } from "../app-drawer/AppDrawer";
import BodyGrid from "./parts/BodyGrid";
import BodyToolbar from "./parts/BodyToolbar";
import { Box } from "@mui/material";
import useDrawerTools from "@hooks/useDrawerTools";

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
    // marginLeft: 0,
    // ...(open && {
    //   transition: transitionDrawShow,
    //   marginLeft: `${DRAWER_WIDTH_OPEN}px`,
    // }),
  };
});
const AppBody = () => {
  const { isDrawerOpen, isDrawerPermanentOpen } = useDrawerTools();

  return (
    <Box
      flexGrow={1}
      marginLeft={isDrawerPermanentOpen ? `${DRAWER_WIDTH_OPEN}px` : 0}
    >
      <DrawerHeaderStyled />
      {/*<BodyToolbar />*/}

      <MainBodyStyled open={isDrawerOpen}>
        <BodyGrid />
      </MainBodyStyled>
    </Box>
  );
};
export default AppBody;
