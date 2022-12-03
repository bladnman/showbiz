import { ShowbizItem } from "../services/TMDB/utils/convertToItem";
import { SxProps } from "@mui/material";
import React from "react";

type SoN = string | null;
type NoN = number | null;
type Size = {
  width: number;
  height: number;
};
type ShowProp = { show: ShowbizItem };
type ShowPropOpt = { show?: ShowbizItem | null };
type SxPropOpt = { sx?: SxProps };
type ClickEvent = React.MouseEvent<HTMLElement>;
type KidProps = {
  children?: React.ReactNode;
};
