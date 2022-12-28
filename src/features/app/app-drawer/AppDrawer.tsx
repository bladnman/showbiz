import React from "react";
import { Box, Divider, Drawer, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import DrawerSection from "./DrawerSection";
import { useDrawerFilters } from "./hooks/useDrawerFilters";
import useShowTools from "../../../hooks/useShowTools";
import useCollectionTools from "../../../hooks/useCollectionTools";
import useActiveCustomDataList from "@hooks/useActiveCustomDataList";
import useBreakSize from "@utils/useBreakSize";
import PushPinIcon from "@mui/icons-material/PushPin";
import SideBarButton from "@components/SideBarButton";
import useDrawerTools from "@hooks/useDrawerTools";

export const DrawerHeaderStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

export default function AppDrawer() {
  const {
    drawerMode,
    toggleDrawer,
    setDrawerLock,
    isDrawerStateLocked,
    isDrawerOpen,
    drawerWidth,
  } = useDrawerTools();
  const { shows } = useShowTools();
  const { collections } = useCollectionTools();
  const customDataList = useActiveCustomDataList();
  const { isGtMd } = useBreakSize();

  const filters = useDrawerFilters(shows, collections, customDataList);

  return (
    <Drawer
      variant={drawerMode}
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
        <SideBarButton />
        {!isGtMd && (
          <IconButton onClick={() => setDrawerLock(!isDrawerStateLocked)}>
            <PushPinIcon
              fontSize={"small"}
              sx={{ opacity: isDrawerStateLocked ? 1 : 0.3 }}
            />
          </IconButton>
        )}
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
