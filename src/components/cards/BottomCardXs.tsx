import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import ItemRating from "../ItemRating";
import { BottomCardProps } from "./BottomCard";

export default function BottomCardXs({
  imagePosterUrl,
  imageBackdropUrl,
  title,
  description,
  rating,
  metaDescription,
}: BottomCardProps) {
  if (!imagePosterUrl || !title) return null;
  const imageHeight = 150;
  const imageWidth = imageHeight * 0.66;
  return (
    <Box>
      <Card>
        <Stack direction="row">
          <Box
            sx={{
              width: { imageWidth },
              height: { imageHeight },
              maxWidth: { imageWidth },
              maxHeight: { imageHeight },
            }}
            width={imageWidth}
            height={imageHeight}
          >
            <img src={imagePosterUrl} width={imageWidth} height={imageHeight} />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Stack>

        <CardContent>
          <Stack
            direction="row"
            gap={2}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <ItemRating rating={rating} />

            <Box flexGrow={1} />

            <Typography variant="caption" color="text.secondary">
              {metaDescription}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
