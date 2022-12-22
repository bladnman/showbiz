import React, { useRef } from "react";
import { Dialog } from "@mui/material";
import useBreakSize from "../../../../utils/useBreakSize";
import useMegaStore from "../../../../store/MegaStore";
import useHydratedShow from "../../../../hooks/useHydratedShow";
import DialogDetailsWithResults from "./DialogDetailsWithResults";
import setSearchMode from "@app-utils/setSearchMode";

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
      <DialogDetailsWithResults show={show} />
    </Dialog>
  );
}
