import React, {useCallback, useRef} from "react";
import {Dialog, DialogContent} from "@mui/material";
import {setSearchMode} from "../../../../utils/appUtils";
import useBreakSize from "../../../../utils/useBreakSize";
import DetailsView from "../../../details/DetailsView";
import useMegaStore from "../../../../store/MegaStore";
import useHydratedShow from "../../../../hooks/useHydratedShow";
import DetailSearchResultsGrid from "./components/DetailSearchResultsGrid";
import DetailSimilarResultsGrid from "./components/DetailSimilarResultsGrid";

export default function DetailsDialog({ isOpen = false }) {
  const { isLtLg } = useBreakSize();
  const detailItem = useMegaStore((state) => state.detailItem);
  const similarToShow = useMegaStore((state) => state.similarToShow);
  const show = useHydratedShow(detailItem);

  //
  // HANDLERS
  const handleClose = useRef(() => {
    setSearchMode(false);
  }).current;
  const hasSimilarShow = !!similarToShow;
  const renderGrid = useCallback(() => {
    if (hasSimilarShow) {
      return <DetailSimilarResultsGrid />;
    }
    return <DetailSearchResultsGrid />;
  }, [hasSimilarShow]);

  if (!show) {
    // show zero-state
  }
  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      fullScreen={isLtLg}
      maxWidth={"lg"}
      fullWidth={true}
      className={"detail_dialog"}
    >
      <DetailsView show={show} />
      <DialogContent>{renderGrid()}</DialogContent>
    </Dialog>
  );
}
