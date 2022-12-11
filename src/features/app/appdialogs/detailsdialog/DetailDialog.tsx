import React, { useRef } from "react";
import { Dialog } from "@mui/material";
import { setSearchMode } from "../../../../utils/appUtils";
import useBreakSize from "../../../../utils/useBreakSize";
import useMegaStore from "../../../../store/MegaStore";
import useHydratedShow from "../../../../hooks/useHydratedShow";
import DetailsMultiScrollView from "../../../details/DetailsMultiScrollView";

export default function DetailsDialog({ isOpen = false }: { isOpen: boolean }) {
  const { isLtLg } = useBreakSize();
  const detailItem = useMegaStore((state) => state.detailItem);
  const show = useHydratedShow(detailItem);

  //
  // HANDLERS
  const handleClose = useRef(() => {
    setSearchMode(false);
  }).current;

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
      <DetailsMultiScrollView show={show} />
    </Dialog>
  );
}
