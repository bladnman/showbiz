import useMegaStore from "@store/MegaStore";

export default function setSearchQuery(value: string | undefined | null) {
  useMegaStore.setState({
    searchQuery: value,
  });
}
