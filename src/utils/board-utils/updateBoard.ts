import { BoardConfig } from "@types";
import useMegaStore from "@store/MegaStore";
import { isBoardInList } from "@utils/board-utils/isBoardInList";
import { fire_saveBoard } from "@services/firestore/utils/fire_utils";
import setBoards from "@utils/board-utils/setBoards";

export default async function updateBoard(board: BoardConfig) {
  if (!board) return;
  const boards = useMegaStore.getState().boards;

  // already saved, move on
  if (!isBoardInList(board, boards)) return;

  // add to cloud
  await fire_saveBoard(board);

  // - remove any previous version from list
  // - add the new one
  // - save list and notify of change
  setBoards(boards.filter((item) => item.id !== board.id).concat(board));
}
