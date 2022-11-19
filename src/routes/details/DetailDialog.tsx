import {
  Box,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useRef } from "react";
import { posterWidthtoHeightRatio } from "../../store/const";
import useMegaStore from "../../store/MegaStore";
import { setDetailItem } from "../../store/utils/itemUtils";
import useBreakSize from "../../utils/useBreakSize";

export default function DetailDialog() {
  const detailItem = useMegaStore((state) => state.detailItem);
  const { isLtMd } = useBreakSize();

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
        <Stack direction="row" gap="50">
          <DialogContentText>
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
          </DialogContentText>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
