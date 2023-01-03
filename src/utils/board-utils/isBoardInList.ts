import { BoardConfig } from "@types";

export function isBoardInList(boardConfig: BoardConfig, boards: BoardConfig[]) {
  return boards.some((item) => item.id === boardConfig.id);
}
