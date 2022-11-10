import useMegaStore from "../MegaStore";

export function setSearchQuery(value: string | undefined) {
  useMegaStore.setState({
    searchQuery: value,
  });
}
export function setSearchType(value: string | undefined) {
  useMegaStore.setState({
    searchType: value,
  });
}
