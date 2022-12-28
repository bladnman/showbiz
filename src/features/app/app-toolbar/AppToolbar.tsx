import React from "react";
import {
  AppBar,
  AppBarProps,
  Box,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import useMegaStore from "../../../store/MegaStore";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH_OPEN } from "@store/const";
import SearchButton from "@components/SearchButton";
import SideBarButton from "@components/SideBarButton";
import SelectionTools from "@features/app/app-body/parts/selection-tools/SelectionTools";

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
          {/* MENU BUTTON */}
          <Box>
            <Box
              sx={{ ml: 0, mr: 1, ...(isDrawerOpen && { display: "none" }) }}
            >
              <SideBarButton />
            </Box>
          </Box>

          <Stack direction={"row"}>
            {/* TITLE */}
            {/*<Typography variant={"h6"}>{appName}</Typography>*/}

            <SelectionTools />

            {/* SEARCH BUTTON */}
            <SearchButton />
          </Stack>
        </Stack>
      </Toolbar>
    </MyAppBar>
  );
}
