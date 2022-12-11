import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  AppBarProps,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import useMegaStore from "../../../store/MegaStore";
import { toggleDrawer } from "../../../utils/appUtils";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH_OPEN } from "../../../store/const";
import ToolbarSearch from "./components/ToolbarSearch";

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
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);
  const appName = useMegaStore((state) => state.appName);
  const onMenuClick = useCallback(() => {
    toggleDrawer();
  }, []);

  return (
    <MyAppBar
      position={"fixed"}
      color={"transparent"}
      open={isDrawerOpen}
      elevation={0}
    >
      <Toolbar>
        <Stack
          direction={"row"}
          flexGrow={1}
          alignItems="center"
          justifyContent={"space-between"}
        >
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
          <Typography variant={"h6"}>{appName}</Typography>
          <ToolbarSearch />
        </Stack>
      </Toolbar>
    </MyAppBar>
  );
}
