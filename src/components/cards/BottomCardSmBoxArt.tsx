import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { posterWidthtoHeightRatio } from "../../store/const";
import ItemRating from "../ItemRating";
import { BottomCardProps } from "./types";

export default function BottomCardSmBoxArt({
  imagePosterUrl,
  imageBackdropUrl,
  title,
  description,
  rating,
  metaDescription,
}: BottomCardProps) {
  if (!imagePosterUrl || !title) return null;

  const posterHeight = 300;
  const posterWidth = posterHeight * posterWidthtoHeightRatio;

  return (
    <Box>
      <Card>
        <Stack direction="column">
          <Box>
            <CardMedia
              component="img"
              src={imagePosterUrl}
              width={"100%"}
              style={{ height: "12em" }}
            />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
}
