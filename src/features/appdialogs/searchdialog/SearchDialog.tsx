import { Dialog, DialogContent } from "@mui/material";
import { useRef } from "react";
import { useMovie } from "../../../services/TMDB/hooks/useApi";
import { setSearchMode } from "../../../store/utils/appUtils";
import { IDS } from "../../../utils/CONST";
import useBreakSize from "../../../utils/useBreakSize";
import DetailsView from "../../details/DetailsView";
import useSearchSelectedShow from "../../details/hooks/useSearchSelectedShow";
import SearchResultsGrid from "../../search/SearchResultsGrid";

export default function SearchDialog({ isOpen = false }) {
  const { isLtMd } = useBreakSize();
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
      fullScreen={isLtMd}
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
