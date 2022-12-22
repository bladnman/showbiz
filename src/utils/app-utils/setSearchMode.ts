import useMegaStore from "@store/MegaStore";

export default function setSearchMode(isEnabled: boolean) {
  useMegaStore.setState({
    isDetailsOpen: isEnabled,
  });
}
