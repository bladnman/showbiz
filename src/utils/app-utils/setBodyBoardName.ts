import useMegaStore from "@store/MegaStore";

export default function setBodyBoardName(value?: string) {
  useMegaStore.setState({
    bodyBoardName: value,
  });
}
