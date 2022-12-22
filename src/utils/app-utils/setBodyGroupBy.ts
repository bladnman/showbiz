import useMegaStore from "@store/MegaStore";

export default function setBodyGroupBy(value?: string) {
  useMegaStore.setState({
    bodyGroupBy: value,
  });
}
