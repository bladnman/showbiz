import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  AppBarProps,
  createTheme,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import useMegaStore from "../../store/MegaStore";
import { toggleDrawer } from "../../store/utils/appUtils";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH_OPEN } from "../../store/const";

interface MyAppBarProps extends AppBarProps {
  open?: boolean;
}

const MyAppBar = styled(AppBar, {
  shouldForwardProp: (prop: string) => prop !== "open",
})<MyAppBarProps>(({ theme, open }) => {
  const transitionDrawShow = theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  });
  const transitionDrawHide = theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  return {
    transition: transitionDrawHide,
    ...(open && {
      width: `calc(100% - ${DRAWER_WIDTH_OPEN}px)`,
      marginLeft: `${DRAWER_WIDTH_OPEN}px`,
      transition: transitionDrawShow,
    }),
  };
});

export default function AppToolbar() {
  const drawerWidth = useMegaStore((state) => state.drawerWidth);
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);
  const appName = useMegaStore((state) => state.appName);

  const finalDrawerWidth = isDrawerOpen ? drawerWidth : 0;
  const onMenuClick = useCallback(() => {
    toggleDrawer();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <MyAppBar
      position={"fixed"}
      color={"transparent"}
      open={isDrawerOpen}
      elevation={0}
    >
      <Toolbar>
        <Stack direction={"row"} flexGrow={1} alignItems="center">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 0, mr: 1, ...(isDrawerOpen && { display: "none" }) }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant={"h6"}>Showbiz time</Typography>
        </Stack>
      </Toolbar>
    </MyAppBar>
  );
}
