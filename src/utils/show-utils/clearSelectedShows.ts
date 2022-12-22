import useMegaStore from "@store/MegaStore";

export default function clearSelectedShows() {
  useMegaStore.setState({
    selectedShows: [],
  });
}
