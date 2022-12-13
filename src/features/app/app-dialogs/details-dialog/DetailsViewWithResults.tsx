import React from "react";
import { DialogContent, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { ShowPropOpt } from "@types";
import useMegaStore from "@store/MegaStore";
import { setSearchMode } from "@utils/appUtils";
import DetailsView from "../../../details/DetailsView";
import DetailSimilarResultsGrid from "../../../details/parts/details-grids/DetailSimilarResultsGrid";
import DetailSearchResultsGrid from "../../../details/parts/details-grids/DetailSearchResultsGrid";
import DetailsSearchField from "../../../details/parts/DetailsSearchField";

export default function DetailsViewWithResults({ show }: ShowPropOpt) {
  const similarToShow = useMegaStore((state) => state.similarToShow);
  const hasSimilarShow = !!similarToShow;

  if (!show) {
    // show zero-state
  }
  return (
    <Box sx={{ position: "relative" }}>
      {/* SEARCH */}
      <Box
        sx={{
          zIndex: 100,
          position: "absolute",
          // position: "fixed",
          left: 0,
          right: 0,
        }}
      >
        <Box
          flexDirection={"row"}
          justifyContent="space-between"
          display="flex"
          sx={{ position: "relative" }}
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

          <DetailsSearchField maxWidth={350} width={350} />
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
