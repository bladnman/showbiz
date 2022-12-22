import useMegaStore from "@store/MegaStore";

export default function toggleDrawer() {
  const { isDrawerOpen, drawerWidthOpen, drawerWidthClosed } =
    useMegaStore.getState();

  useMegaStore.setState({
    isDrawerOpen: !isDrawerOpen,
    drawerWidth: !isDrawerOpen ? drawerWidthOpen : drawerWidthClosed,
  });
}
