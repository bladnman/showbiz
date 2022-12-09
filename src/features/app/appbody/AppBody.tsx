import { Box } from "@mui/material";
import useMegaStore from "../../../store/MegaStore";
import { COLORS } from "../apptheme/theme_const";
import { toggleDrawer } from "../../../store/utils/appUtils";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH_OPEN } from "../../../store/const";
import { DrawerHeader } from "../appdrawer/AppDrawer";
import ShowGrid from "../../../components/ShowGrid";
import { useCallback } from "react";
import { ShowbizItem } from "../../../@types";
import { showSimilarShows } from "../../../store/utils/itemUtils";
import useBodyShows from "../../../hooks/useBodyShows";

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
  const drawerWidth = useMegaStore((state) => state.drawerWidth);
  const shows = useBodyShows();
  const handleShowClick = useCallback((show: ShowbizItem) => {
    console.log(`[🐽](AppBody) show`, show);
    showSimilarShows(show);
  }, []);
  return (
    <MainBodyStyled open={isDrawerOpen}>
      <Box onClick={() => toggleDrawer()}>
        <DrawerHeader />
        <ShowGrid shows={shows} onClick={handleShowClick} />
      </Box>
    </MainBodyStyled>
  );
};
export default AppBody;
