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
import { styled } from "@mui/system";
const panelShowAniMs = 200;
const panelHideAniMs = 100;
const StyledCard = styled(Card)(() => {
  return {
    ".meta-panel": {
      backgroundColor: "#00000044",
      transition: `background ${panelHideAniMs}ms ease-in-out`,
    },
    ".description": {
      height: 0,
      overflow: "hidden",
      transition: `height ${panelHideAniMs}ms ease-in-out`,
    },
    ":hover": {
      ".meta-panel": {
        transition: `background ${panelShowAniMs}ms ease-in-out`,
        backgroundColor: "#000000aa",
      },
      ".description": {
        height: "3em",
        transition: `height ${panelShowAniMs}ms ease-in-out`,
      },
    },
  };
});

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
  const imageWidth = imageHeight * 2.66;
  return (
    <Box sx={{ height: "56vw" }}>
      <StyledCard>
        <div
          style={{
            position: "relative",
            height: "56vw",
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            src={imageBackdropUrl}
            width={"100%"}
            style={{ position: "absolute", height: "56vw" }}
          />

          <Stack
            direction="row"
            className="meta-panel"
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ textShadow: "1px 1px 1px #000" }}
              >
                {title}
              </Typography>
              <Box className="description">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {description}
                </Typography>
              </Box>

              <Stack
                direction="row"
                gap={2}
                justifyContent="space-between"
                alignItems={"center"}
                marginTop={1}
              >
                <ItemRating rating={rating} />

                <Box flexGrow={1} />

                <Typography variant="caption" color="text.secondary">
                  {metaDescription}
                </Typography>
              </Stack>
            </CardContent>
          </Stack>
        </div>
      </StyledCard>
    </Box>
  );
}
