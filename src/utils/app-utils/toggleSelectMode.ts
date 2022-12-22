import useMegaStore from "@store/MegaStore";

export default function toggleSelectMode() {
  const newSelectMode = !useMegaStore.getState().isSelectMode;
  const selectedShows = useMegaStore.getState().selectedShows;
  useMegaStore.setState({
    isSelectMode: !useMegaStore.getState().isSelectMode,
    selectedShows: !newSelectMode ? [] : selectedShows,
  });
}
