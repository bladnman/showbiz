import useMegaStore from "@store/MegaStore";

export default function setIsDetailsOpen(isOpen: boolean) {
  useMegaStore.setState({
    isDetailsOpen: isOpen,
  });
}
