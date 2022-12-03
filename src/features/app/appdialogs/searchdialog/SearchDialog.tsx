import { Dialog, DialogContent } from "@mui/material";
import { useRef } from "react";
import { setSearchMode } from "../../../../store/utils/appUtils";
import useBreakSize from "../../../../utils/useBreakSize";
import DetailsView from "../../../details/DetailsView";
import useSearchSelectedShow from "../../../details/hooks/useSearchSelectedShow";
import SearchResultsGrid from "../../../search/SearchResultsGrid";

export default function SearchDialog({ isOpen = false }) {
  const { isLtLg } = useBreakSize();
  const show = useSearchSelectedShow();

  //
  // HANDLERS
  const handleClose = useRef(() => {
    setSearchMode(false);
  }).current;

  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      fullScreen={isLtLg}
      maxWidth={"lg"}
      fullWidth={true}
    >
      <DetailsView show={show} />
      <DialogContent>
        <SearchResultsGrid />
      </DialogContent>
    </Dialog>
  );
}
