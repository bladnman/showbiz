import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { setSearchMode } from "../../../store/utils/appUtils";
import useBreakSize from "../../../utils/useBreakSize";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { useBaseImageUrl } from "../../../services/TMDB/hooks/useApi";
import DetailsView from "../../details/DetailsView";

export default function SearchDialog({ isOpen = false }) {
  const { isLtMd } = useBreakSize();
  const windowSize = useWindowSize();

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
      <DetailsView />
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
