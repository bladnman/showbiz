import { Box, Divider, Drawer, IconButton } from "@mui/material";
import useMegaStore from "../../../store/MegaStore";
import { toggleDrawer } from "../../../store/utils/appUtils";
import { styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DrawerList from "./components/DrawerList";
import { useDrawerFilters } from "./hooks/useDrawerFilters";
import useShowTools from "../../../hooks/useShowTools";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AppDrawer() {
  const drawerWidth = useMegaStore((state) => state.drawerWidth);
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);
  const { shows } = useShowTools();

  const filters = useDrawerFilters(shows);

  return (
    <Drawer
      variant="permanent"
      open={isDrawerOpen}
      onClose={() => toggleDrawer()}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          width: drawerWidth,
          borderWidth: 0,
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={() => toggleDrawer()}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box paddingTop={3} p={2} role={"presentation"}>
        {filters.map((filter) => (
          <DrawerList filter={filter} key={filter.title} />
        ))}
      </Box>
    </Drawer>
  );
}
