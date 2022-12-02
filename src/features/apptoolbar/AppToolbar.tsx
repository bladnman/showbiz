import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  createTheme,
  IconButton,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import useMegaStore from "../../store/MegaStore";
import { toggleDrawer } from "../../store/utils/appUtils";

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${finalDrawerWidth}px)`,
          ml: `${finalDrawerWidth}px`,
        }}
      >
        <Toolbar>
          <Stack direction={"row"} flexGrow={1} alignItems="center">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 1, ...(isDrawerOpen && { display: "none" }) }}
              onClick={onMenuClick}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <ThemeProvider theme={darkTheme}>
            {/* <QuickMatchField /> */}
            <Box width={"1em"} flexShrink={0} />
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
