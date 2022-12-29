import { PosterTileProps } from "@features/tiles/poster-tile/base-poster-tile/BasePosterTile";
import { ShowbizItem, ShowPropOpt } from "@types";
import { MouseEvent } from "react";

type PosterTileProps = ShowPropOpt & {
  height?: number;
  width?: number;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
};
type SelectablePosterTileProps = {
  show?: ShowbizItem | null;
  height?: number;
  width?: number;
  onClick?: (show: ShowbizItem, event?: MouseEvent<HTMLDivElement>) => void;
  selected?: boolean;
};
type CompositePosterTileProps = SelectablePosterTileProps;
