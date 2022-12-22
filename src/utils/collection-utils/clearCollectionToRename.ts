import useMegaStore from "@store/MegaStore";

export default function clearCollectionToRename() {
  useMegaStore.setState({ collectionToRename: null });
}
