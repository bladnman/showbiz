import React from "react";
import { ShowPropOpt } from "@types";
import { Button } from "@mui/material";
import { showSimilarShows } from "@utils/itemUtils";
import useMegaStore from "@store/MegaStore";

export default function DetailsShowSimilar({ show }: ShowPropOpt) {
  const similarToShow = useMegaStore((state) => state.similarToShow);
  const isShowingSimilarToThis = Boolean(show && similarToShow?.id === show.id);

  if (!show) return null;

  return (
    <Button
      disabled={isShowingSimilarToThis}
      onClick={() => showSimilarShows(show)}
    >
      {isShowingSimilarToThis ? "showing similar" : "show similar"}
    </Button>
  );
}
