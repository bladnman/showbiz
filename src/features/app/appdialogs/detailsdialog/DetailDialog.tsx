import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useStreamInfo from "../../../../services/StreamAPI/useStreamInfo";
import { posterWidthtoHeightRatio } from "../../../../store/const";
import useMegaStore from "../../../../store/MegaStore";
import { setDetailItem } from "../../../../store/utils/itemUtils";
import useBreakSize from "../../../../utils/useBreakSize";
import useHydratedShow from "../../../../hooks/useHydratedShow";

export default function DetailDialog({ isOpen = false }) {
  const detailItem = useMegaStore((state) => state.detailItem);
  const show = useHydratedShow(detailItem);
  const [isStreamEnabled, setIsStreamEnabled] = useState(false);
  const { isLtMd } = useBreakSize();
  const streamInfo = useStreamInfo(isStreamEnabled, show);

  console.log(`🐽 [DetailDialog] streamInfo`, streamInfo);
  console.log(`🐽 [DetailDialog] fullShow`, show);

  useEffect(() => {
    setIsStreamEnabled(false);
  }, [detailItem]);

  //
  // HANDLERS
  const handleClose = useRef(() => {
    setDetailItem(null);
  }).current;
  const handleFetchStreamInfo = useRef(() => {
    setIsStreamEnabled(true);
  }).current;

  const posterHeight = 300;
  const posterWidth = posterHeight * posterWidthtoHeightRatio;
  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      fullScreen={isLtMd}
      PaperProps={{
        style: {
          // backgroundColor: "transparent",
          // boxShadow: "none",
          position: "relative",
          overflow: "auto",
        },
      }}
    >
      <DialogTitle>{detailItem?.name}</DialogTitle>
      <DialogContent sx={{ height: 400 }}>
        <Box
          sx={{
            paddingRight: "25px",
            float: "left",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: `${posterWidth}px`,
              height: `${posterHeight}px`,
              backgroundColor: "#000000aa",
              padding: "5px",
              borderRadius: "10px",
            }}
            src={`${detailItem?.posterPath ?? detailItem?.profilePath}`}
          />
        </Box>
        {detailItem?.description}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFetchStreamInfo} disabled={isStreamEnabled}>
          Fetch Stream Info
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
