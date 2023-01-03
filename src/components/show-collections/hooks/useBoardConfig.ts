import { BoardConfig, BoardItem, ShowbizItem } from "@types";
import useMegaStore from "@store/MegaStore";

export default function useBoardConfig(
  id?: number,
  shows?: ShowbizItem[] | null
) {
  if (!id) return undefined;
  const storedConfigs = useMegaStore
    .getState()
    .boards.find((config) => config.id === id);
  return storedConfigs ?? createBoardConfig(id, "default", shows);
}

function createBoardConfig(
  id: number,
  name: string,
  shows?: ShowbizItem[] | null
): BoardConfig {
  return {
    id,
    name,
    items: shows?.map(getShowBoardData) ?? [],
    position: {
      x: 0,
      y: 0,
    },
    scale: 1.0,
  };
}

function getShowBoardData(show: ShowbizItem): BoardItem {
  return {
    id: show.id,
    name: show.name,
    type: "show",
    position: {
      x: 0,
      y: 0,
    },
    rotation: 0.0,
    scale: 1.0,
  };
}
