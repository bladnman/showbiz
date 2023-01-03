import { BoardConfig } from "@types";
import useMegaStore from "@store/MegaStore";
import { fire_deleteBoard } from "@services/firestore/utils/fire_utils";
import setBoards from "@utils/board-utils/setBoards";

export default async function removeBoard(board: BoardConfig) {
  if (!board) return;
  const boards = useMegaStore.getState().boards;

  // delete from cloud
  await fire_deleteBoard(board);

  // save list and notify of change
  setBoards(boards.filter((item) => item.id !== board.id));
}
