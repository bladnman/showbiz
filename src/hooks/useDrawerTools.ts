import useMegaStore from "@store/MegaStore";
import setDrawerLock from "@app-utils/setDrawerLock";
import toggleDrawer from "@/utils/app-utils/toggleDrawer";
import { useMemo } from "react";

export default function useDrawerTools() {
  const drawerWidth = useMegaStore((state) => state.drawerWidth);
  const drawerMode = useMegaStore((state) => state.drawerMode);
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);
  const isDrawerStateLocked = useMegaStore(
    (state) => state.isDrawerStateLocked
  );
  const isDrawerLockedOpen = isDrawerStateLocked && isDrawerOpen;
  return useMemo(
    () => ({
      drawerMode,
      drawerWidth,
      isDrawerOpen,
      isDrawerPermanentOpen: isDrawerOpen && drawerMode === "permanent",
      isDrawerStateLocked,
      isDrawerLockedOpen,
      setDrawerLock,
      toggleDrawer,
    }),
    [
      drawerMode,
      drawerWidth,
      isDrawerLockedOpen,
      isDrawerOpen,
      isDrawerStateLocked,
    ]
  );
}
