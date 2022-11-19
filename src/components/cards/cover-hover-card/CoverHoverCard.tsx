import { Box, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { posterWidthtoHeightRatio } from "../../../store/const";
import { ShowbizItem } from "../../../TMDB/utils/convertToItem";
import { fLeft } from "../../../utils/MU";
import useBreakSize from "../../../utils/useBreakSize";
import ItemRating from "../../ItemRating";
import { default as StyledCoverHoverCard } from "./StyledCoverHoverCard";

export default function CoverHoverCard({ show }: { show: ShowbizItem }) {
  const rating = (show.voteAverage ?? 0) / 2;
  const year = useMemo(() => {
    if (show.isTv) {
      return show.firstAirDate ? fLeft(show.firstAirDate, "-") : null;
    } else if (show.isMovie) {
      return show.releaseDate ? fLeft(show.releaseDate, "-") : null;
    }
  }, [show]);
  const yearDesc = useMemo(() => {
    if (show.isTv) {
      return year ? `TV ~ ${year}` : null;
    } else if (show.isMovie) {
      return year ? `Movie - ${year}` : null;
    }
  }, [show, year]);
  const { isGtXs } = useBreakSize();

  // const height = "56vw";
  const cardHeight = isGtXs ? 300 : 220;
  const cardWidth = posterWidthtoHeightRatio * cardHeight;
  const cardCornerRadius = 15;

  return (
    <Box sx={{ height: cardHeight, width: cardWidth }}>
      <StyledCoverHoverCard>
        <div
          style={{
            position: "relative",
            height: cardHeight,
            width: cardWidth,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            src={show.posterPath}
            width={cardWidth}
            style={{
              position: "absolute",
              height: cardHeight,
            }}
          />

          <CardContent
            className="meta-panel"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Box className="meta-text">
              <Typography
                gutterBottom
                variant="body2"
                component="div"
                sx={{ fontWeight: "bold", textShadow: "1px 1px 1px #00000088" }}
              >
                {show.name}
              </Typography>

              <Typography
                className="description"
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 5,
                }}
              >
                {show.description}
              </Typography>
            </Box>
          </CardContent>

          <Box
            sx={{
              display: "flex",
              position: "absolute",
              right: 0,
              top: 0,
              backgroundColor: "#00000077",
              padding: `0 5px 0 10px`,
              borderRadius: `0 0 0 ${cardCornerRadius / 2}px`,
            }}
            justifyItems="center"
            justifyContent="center"
            flexDirection={"row"}
          >
            <Typography
              gutterBottom
              variant="caption"
              component="div"
              className="year"
              sx={{
                color: "#c0c0c0",
                textShadow: "1px 1px 1px #00000088",
              }}
            >
              {yearDesc}
            </Typography>
          </Box>

          <Box
            className="rating-box"
            sx={{
              display: "flex",
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#00000077",
              padding: "5px",
            }}
            justifyItems="center"
            justifyContent="center"
            flexDirection={"row"}
          >
            <ItemRating rating={rating} />
          </Box>
        </div>
      </StyledCoverHoverCard>
    </Box>
  );
}
