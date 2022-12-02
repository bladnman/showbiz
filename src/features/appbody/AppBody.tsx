import { Box, Typography } from "@mui/material";
import useMegaStore from "../../store/MegaStore";
import { COLORS_DARK } from "../apptheme/theme_const";
import { toggleDrawer } from "../../store/utils/appUtils";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH_OPEN } from "../../store/const";
import { DrawerHeader } from "../appdrawer/AppDrawer";

const MainBody = styled("main", {
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
    backgroundColor: COLORS_DARK.bg_back,
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
  return (
    <MainBody open={isDrawerOpen}>
      <Box onClick={() => toggleDrawer()}>
        <DrawerHeader />
        <Typography>Hiya... I'm the body</Typography>
      </Box>
    </MainBody>
  );
};
export default AppBody;
