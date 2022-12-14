import React, { ReactNode, useCallback, useRef } from "react";
import { AppBar, DialogContent, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { ShowPropOpt } from "@types";
import useMegaStore from "@store/MegaStore";
import { setSearchMode } from "@utils/appUtils";
import DetailsPanel from "../../../details/DetailsPanel";
import DetailSimilarResultsGrid from "../../../details/parts/details-grids/DetailSimilarResultsGrid";
import DetailSearchResultsGrid from "../../../details/parts/details-grids/DetailSearchResultsGrid";
import DetailsSearchField from "./parts/DetailsSearchField";
import { GLASS_BACKDROP_FILTER } from "@CONST";

export default function DialogDetailsWithResults({ show }: ShowPropOpt) {
  const similarToShow = useMegaStore((state) => state.similarToShow);
  const hasSimilarShow = !!similarToShow;
  const containerRef = useRef<HTMLDivElement>();

  const scrollToTop = useCallback(() => {
    const parentNode = containerRef.current?.parentNode as HTMLDivElement;
    parentNode?.scrollTo({ top: 0, behavior: "smooth" });
  }, [containerRef]);

  if (!show) {
    // show zero-state
  }
  return (
    <Box
      sx={{ position: "relative" }}
      className={"detail_with_results"}
      ref={containerRef}
    >
      {/*
       * APP BAR - == - == - == - == - == - == - == - == - == - ==
       */}
      <AppBar position="sticky" onClick={scrollToTop}>
        <Box
          flexDirection={"row"}
          justifyContent="space-between"
          display="flex"
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            backdropFilter: GLASS_BACKDROP_FILTER,
          }}
        >
          <Box justifyContent="center" display="flex" paddingX={1}>
            {/*   C L O S E   B U T T O N   */}
            <IconButton size={"large"} onClick={() => setSearchMode(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/*   S E A R C H   F I E L D    */}
          <DetailsSearchField maxWidth={350} width={350} />
        </Box>
      </AppBar>
      {/*
       * PAGE CONTENT - == - == - == - == - == - == - == - == - == - ==
       */}
      <DialogContent sx={{ padding: 0 }}>
        {/*    D E T A I L S    */}
        <DetailsPanel show={show} />

        {/*    R E S U L T S   G R I D    */}
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
