import useMegaStore from "@store/MegaStore";

export default function setCollectionToRename(collectionName: string) {
  useMegaStore.setState({ collectionToRename: collectionName });
}
