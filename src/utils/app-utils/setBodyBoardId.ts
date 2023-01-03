import useMegaStore from "@store/MegaStore";

export default function setBodyBoardId(value?: number) {
  useMegaStore.setState({
    bodyBoardId: value,
  });
}
