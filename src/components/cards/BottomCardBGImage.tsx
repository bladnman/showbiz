import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ItemRating from "../ItemRating";
import { BottomCardProps } from "./types";
const panelShowAniMs = 200;
const panelHideAniMs = 100;
const StyledCard = styled(Card)(({ expanded }: { expanded: boolean }) => {
  const collapsedHeight = 0;
  const expandedHeight = "4.6em";
  const collapsedBgColor = "#00000044";
  const expandedBgColor = "#000000aa";
  console.log(`🐽 [BottomCardBGImage] expanded`, expanded);
  return {
    ".meta-panel": {
      backgroundColor: expanded ? expandedBgColor : collapsedBgColor,
      transition: `background ${panelHideAniMs}ms ease-in-out`,
    },
    ".description": {
      height: expanded ? expandedHeight : collapsedHeight,
      overflow: "hidden",
      transition: `height ${panelHideAniMs}ms ease-in-out`,
    },
    ":hover": {
      ".meta-panel": {
        transition: `background ${panelShowAniMs}ms ease-in-out`,
        backgroundColor: expandedBgColor,
      },
      ".description": {
        height: expandedHeight,
        transition: `height ${panelShowAniMs}ms ease-in-out`,
      },
    },
  };
});

export default function BottomCardBGImage(props: BottomCardProps) {
  const {
    imagePosterUrl,
    imageBackdropUrl,
    title,
    description,
    rating,
    metaDescription,
    expanded,
  } = props;
  const height = props.height ?? "30vh";
  if (!imagePosterUrl || !title) return null;
  return (
    <Box sx={{ height: height }}>
      <StyledCard expanded={expanded ?? false}>
        <div
          style={{
            position: "relative",
            height: height,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            src={imageBackdropUrl}
            width={"100%"}
            style={{ position: "absolute", height: height }}
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
                    WebkitLineClamp: 3,
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
                marginTop={0}
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
