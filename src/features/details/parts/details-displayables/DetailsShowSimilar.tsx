import React from "react";
import { ShowPropOpt, SxPropOpt } from "@types";
import Tag from "@components/text/Tag";
import { getYearSpanDisplay } from "@services/TMDB/utils/yearUtils";
import { Button, Stack } from "@mui/material";
import NetworkIcon from "@components/icons/NetworkIcon";
import { showSimilarShows } from "@utils/itemUtils";

export default function DetailsShowSimilar({
  show,
  sx,
}: ShowPropOpt & SxPropOpt) {
  if (!show) return null;

  return <Button onClick={() => showSimilarShows(show)}>show similar</Button>;
}
