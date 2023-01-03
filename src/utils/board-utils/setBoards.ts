import { BoardConfig } from "@types";
import useMegaStore from "@store/MegaStore";

export default function setBoards(boards: BoardConfig[]) {
  useMegaStore.setState({
    boards: [...boards],
  });
}
