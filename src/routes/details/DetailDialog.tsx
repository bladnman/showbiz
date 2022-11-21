import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { posterWidthtoHeightRatio } from "../../store/const";
import useMegaStore from "../../store/MegaStore";
import { setDetailItem } from "../../store/utils/itemUtils";
import useBreakSize from "../../utils/useBreakSize";
import useStreamInfo from "../../StreamAPI/useStreamInfo";

export default function DetailDialog() {
  const detailItem = useMegaStore((state) => state.detailItem);
  const [isStreamEnabled, setIsStreamEnabled] = useState(false);
  const { isLtMd } = useBreakSize();
  const streamInfo = useStreamInfo(isStreamEnabled, detailItem);
  console.log(`🐽 [DetailDialog] streamInfo`, streamInfo);

  useEffect(() => {
    setIsStreamEnabled(false);
  }, [detailItem]);

  //
  // HANDLERS
  const handleClose = useRef(() => {
    setDetailItem(null);
  }).current;

  const posterHeight = 300;
  const posterWidth = posterHeight * posterWidthtoHeightRatio;
  return (
    <Dialog
      onClose={handleClose}
      open={!!detailItem}
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
        <Button
          onClick={() => setIsStreamEnabled(true)}
          disabled={isStreamEnabled}
        >
          Fetch Stream Info
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
