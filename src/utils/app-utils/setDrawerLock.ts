import useMegaStore from "@store/MegaStore";

export default function setDrawerLock(isLocked: boolean) {
  useMegaStore.setState({
    isDrawerStateLocked: isLocked,
  });
}
