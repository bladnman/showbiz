import useMegaStore from "../MegaStore";

export function toggleDrawer() {
  const { isDrawerOpen, drawerWidthOpen, drawerWidthClosed } =
    useMegaStore.getState();

  useMegaStore.setState({
    isDrawerOpen: !isDrawerOpen,
    drawerWidth: !isDrawerOpen ? drawerWidthOpen : drawerWidthClosed,
  });
}
export function toggleSearchMode() {
  setSearchMode(!useMegaStore.getState().isSearchMode);
}
export function setSearchMode(isEnabled: boolean) {
  useMegaStore.setState({
    isSearchMode: isEnabled,
  });
}
