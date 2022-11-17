import {
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useRef } from "react";
import useMegaStore from "../../store/MegaStore";
import { setDetailItem } from "../../store/utils/itemUtils";
import { useBaseImageUrl } from "../../TMDB/hooks/useApi";
import useBreakSize from "../../utils/useBreakSize";

export default function DetailDialog() {
  const detailItem = useMegaStore((state) => state.detailItem);
  const { isLtMd } = useBreakSize();
  const baseImgUrl = useBaseImageUrl();

  //
  // HANDLERS
  const handleClose = useRef(() => {
    setDetailItem(null);
  }).current;

  console.log(
    `🐽 [DetailDialog] detailItem?.posterPath`,
    detailItem?.posterPath
  );
  return (
    <Dialog onClose={handleClose} open={!!detailItem} fullScreen={isLtMd}>
      <DialogTitle>{detailItem?.name}</DialogTitle>
      <DialogContent sx={{ height: 400 }}>
        <Stack direction="row" gap="10">
          <DialogContentText>{detailItem?.description}</DialogContentText>

          <CardMedia
            component="img"
            sx={{
              width: "175px",
              height: "300px",
            }}
            src={`${baseImgUrl}${detailItem?.posterPath}`}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
