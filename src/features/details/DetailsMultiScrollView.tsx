import React, { useCallback } from "react";
import { DialogContent } from "@mui/material";
import Box from "@mui/material/Box";
import { ShowPropOpt } from "../../@types";
import DetailsView from "./DetailsView";
import DetailSimilarResultsGrid from "./components/details-grids/DetailSimilarResultsGrid";
import DetailSearchResultsGrid from "./components/details-grids/DetailSearchResultsGrid";
import useMegaStore from "../../store/MegaStore";
import BoxAbsolute from "../../components/box/BoxAbsolute";
import DetailsSearchField from "./components/DetailsSearchField";

export default function DetailsMultiScrollView({ show }: ShowPropOpt) {
  const similarToShow = useMegaStore((state) => state.similarToShow);
  const hasSimilarShow = !!similarToShow;

  if (!show) {
    // show zero-state
  }
  return (
    <Box sx={{ position: "relative" }}>
      {/* SEARCH */}
      <Box sx={{ zIndex: 100, position: "fixed", width: "100%" }}>
        <Box flexDirection={"row"} justifyContent="center" display="flex">
          <DetailsSearchField marginTop={1} maxWidth={350} width={350} />
        </Box>
      </Box>
      <DialogContent sx={{ padding: 0 }}>
        <DetailsView show={show} />

        <DialogContent>
          {hasSimilarShow ? (
            <DetailSimilarResultsGrid />
          ) : (
            <DetailSearchResultsGrid />
          )}
        </DialogContent>
      </DialogContent>
    </Box>
  );
}
