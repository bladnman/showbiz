import useMegaStore from "@store/MegaStore";

export function setSearchType(value: string | undefined) {
  useMegaStore.setState({
    searchType: value,
  });
}
