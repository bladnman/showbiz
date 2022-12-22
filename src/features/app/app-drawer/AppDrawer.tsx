import React from "react";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import useMegaStore from "../../../store/MegaStore";
import { styled } from "@mui/material/styles";
import DrawerSection from "./DrawerSection";
import { useDrawerFilters } from "./hooks/useDrawerFilters";
import useShowTools from "../../../hooks/useShowTools";
import useCollectionTools from "../../../hooks/useCollectionTools";
import { SideBarIcon } from "@/images/AppIcons";
import useActiveCustomDataList from "@hooks/useActiveCustomDataList";
import toggleDrawer from "@app-utils/toggleDrawer";

export const DrawerHeaderStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  // justifyContent: "flex-end",
}));

export default function AppDrawer() {
  const drawerWidth = useMegaStore((state) => state.drawerWidth);
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);
  const { shows } = useShowTools();
  const { collections } = useCollectionTools();
  const customDataList = useActiveCustomDataList();

  const filters = useDrawerFilters(shows, collections, customDataList);

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
      <DrawerHeaderStyled>
        <IconButton onClick={() => toggleDrawer()}>
          <SideBarIcon size={20} opacity={0.6} />
        </IconButton>
      </DrawerHeaderStyled>
      <Divider />
      <Box paddingTop={3} p={2} role={"presentation"}>
        {filters.map((filter) => (
          <DrawerSection filter={filter} key={filter.title} />
        ))}
      </Box>
    </Drawer>
  );
}
