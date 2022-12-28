import useMegaStore from "@store/MegaStore";
import useBreakSize from "@utils/useBreakSize";
import { useEffect } from "react";
import setDrawerMode from "@/utils/app-utils/setDrawerMode";

export default function useDrawerModeManager() {
  const { isGtMd } = useBreakSize();
  const isDrawerOpen = useMegaStore((state) => state.isDrawerOpen);
  const isDrawerStateLocked = useMegaStore(
    (state) => state.isDrawerStateLocked
  );
  const isDrawerLockedOpen = isDrawerStateLocked && isDrawerOpen;

  useEffect(() => {
    const currentMode = useMegaStore.getState().drawerMode;
    const newMode = isGtMd || isDrawerLockedOpen ? "permanent" : "temporary";
    // update on change only
    if (currentMode != newMode) {
      setDrawerMode(newMode);
    }
  }, [isDrawerLockedOpen, isGtMd]);
}
