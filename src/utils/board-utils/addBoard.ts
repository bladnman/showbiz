import { BoardConfig } from "@types";
import useMegaStore from "@store/MegaStore";
import { isBoardInList } from "@utils/board-utils/isBoardInList";
import { fire_saveBoard } from "@services/firestore/utils/fire_utils";
import setBoards from "@utils/board-utils/setBoards";

export default async function addBoard(board: BoardConfig) {
  const boards = useMegaStore.getState().boards;

  // already saved, move on
  if (isBoardInList(board, boards)) return;

  // add to cloud
  await fire_saveBoard(board);

  // push to local list
  boards.push(board);

  // save to cloud and notify of change
  setBoards(boards);
}
