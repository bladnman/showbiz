import useMegaStore from "../store/MegaStore";
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
  showSearchFor(null);
}

export function toggleSelectMode() {
  const newSelectMode = !useMegaStore.getState().isSelectMode;
  const selectedShows = useMegaStore.getState().selectedShows;
  useMegaStore.setState({
    isSelectMode: !useMegaStore.getState().isSelectMode,
    selectedShows: !newSelectMode ? [] : selectedShows,
  });
}

export function setSearchMode(isEnabled: boolean) {
  useMegaStore.setState({
    isDetailsOpen: isEnabled,
  });
}

export function setBodyGroupBy(value?: string) {
  useMegaStore.setState({
    bodyGroupBy: value,
  });
}
