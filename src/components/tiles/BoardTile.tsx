import React from "react";
import CompositePosterTile from "@features/tiles/poster-tile/CompositePosterTile";
import { BoardItem } from "@types";
import getShowById from "@show-utils/getShowById";

type Props = {
  boardItem: BoardItem;
  options?: { posterWidth?: number };
};
export default function BoardTile(props: Props) {
  if (props.boardItem.type === "show") {
    return <ShowBoardTile {...props} />;
  }
  return null;
}

function ShowBoardTile(props: Props) {
  const { boardItem, options } = props;
  const posterWidth = options?.posterWidth || 150;

  const show = getShowById(boardItem.id);

  if (!show) return null;

  return <CompositePosterTile show={show} width={posterWidth} />;
}
