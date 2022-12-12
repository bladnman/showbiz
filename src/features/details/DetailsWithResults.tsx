import React from "react";
import { DialogContent, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { ShowPropOpt } from "../../@types";
import DetailsView from "./DetailsView";
import DetailSimilarResultsGrid from "./components/details-grids/DetailSimilarResultsGrid";
import DetailSearchResultsGrid from "./components/details-grids/DetailSearchResultsGrid";
import useMegaStore from "../../store/MegaStore";
import CloseIcon from "@mui/icons-material/Close";
import DetailsSearchField from "./components/DetailsSearchField";
import { setSearchMode } from "../../utils/appUtils";

export default function DetailsWithResults({ show }: ShowPropOpt) {
  const similarToShow = useMegaStore((state) => state.similarToShow);
  const hasSimilarShow = !!similarToShow;

  if (!show) {
    // show zero-state
  }
  return (
    <Box sx={{ position: "relative" }}>
      {/* SEARCH */}
      <Box sx={{ zIndex: 100, position: "fixed", width: "100%" }}>
        <Box
          flexDirection={"row"}
          justifyContent="space-between"
          display="flex"
        >
          <Box
            justifyContent="center"
            display="flex"
            paddingX={1}
            sx={{
              backdropFilter: "blur(2px) brightness(60%)",
            }}
          >
            <IconButton size={"large"} onClick={() => setSearchMode(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DetailsSearchField marginTop={0} maxWidth={350} width={350} />
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
