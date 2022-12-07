import useMegaStore from "../MegaStore";
import { showSearchFor } from "./itemUtils";

export function toggleDrawer() {
  const { isDrawerOpen, drawerWidthOpen, drawerWidthClosed } =
    useMegaStore.getState();

  useMegaStore.setState({
    isDrawerOpen: !isDrawerOpen,
    drawerWidth: !isDrawerOpen ? drawerWidthOpen : drawerWidthClosed,
  });
}

export function toggleSearchMode() {
  // setSearchMode(!useMegaStore.getState().isDetailsOpen);
  showSearchFor(null);
}

export function setSearchMode(isEnabled: boolean) {
  useMegaStore.setState({
    isDetailsOpen: isEnabled,
  });
}
