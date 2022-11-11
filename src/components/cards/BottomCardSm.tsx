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

  return (
    <Box height="350">
      <Card>
        <Stack direction="column">
          <Box>
            <CardMedia component="img" image={imageBackdropUrl} />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>

            <Box height={5} />

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
        </Stack>
      </Card>
    </Box>
  );
}
