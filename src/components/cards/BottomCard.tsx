import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Spacer from "../Spacer";

type BottomCardProps = {
  imageUrl: string;
  title: string;
  description?: SoN;
  rating?: number | null;
  metaDescription?: SoN;
};
export default function BottomCard({
  imageUrl,
  title,
  description,
  rating,
  metaDescription,
}: BottomCardProps) {
  if (!imageUrl || !title) return null;

  return (
    <Box>
      <Card sx={{ maxWidth: 450 }}>
        <div style={{ position: "relative", overflow: "visible" }}>
          <CardMedia component="img" height="300" image={imageUrl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>

            <Box height={5} />

            <Stack
              direction={"row"}
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
        </div>
      </Card>
    </Box>
  );
}
const ItemRating = ({ rating }: { rating?: number | null }) => {
  if (!rating) return null;

  return (
    <Rating
      name="read-only"
      value={rating}
      readOnly
      precision={0.25}
      size="small"
    />
  );
};
