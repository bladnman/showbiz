import { Box, Drawer } from "@mui/material";
import useMegaStore from "../../store/MegaStore";
import { toggleDrawer } from "../../store/utils/appUtils";

export default function AppDrawer() {
  const drawerWidth = useMegaStore((state) => state.drawerWidth);
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);
  const boxSizing = isDrawerOpen ? "border-box" : "none";

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: boxSizing,
            width: drawerWidth,
          },
        }}
      >
        <Box paddingTop={3}>{/* items here */}</Box>
      </Drawer>
    </Box>
  );
}
