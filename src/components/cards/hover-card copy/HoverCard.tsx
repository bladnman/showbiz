import { Box, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { posterWidthtoHeightRatio } from "../../../store/const";
import { ShowbizItem } from "../../../TMDB/utils/convertToItem";
import { fLeft } from "../../../utils/MU";
import useBreakSize from "../../../utils/useBreakSize";
import StyledHoverCard from "../hover-card/StyledHoverCard";

export default function HoverCard({ show }: { show: ShowbizItem }) {
  const rating = (show.voteAverage ?? 0) / 2;
  const year = show.releaseDate ? fLeft(show.releaseDate, "-") : null;
  const metaDescription = useMemo(() => {
    if (show.isTv) {
      if (!show.numberOfEpisodes) return null;
      let desc = `Episodes: ${show.numberOfEpisodes}`;
      if (show.numberOfSeasons) {
        desc = `Seasons: ${show.numberOfSeasons} | ${desc}`;
      }
      return desc;
    } else if (show.isMovie) {
      return year ? `Released: ${year}` : null;
    }
  }, [show]);
  const { isGtXs } = useBreakSize();

  // const height = "56vw";
  const height = isGtXs ? 300 : 220;
  const width = posterWidthtoHeightRatio * height;

  return (
    <Box sx={{ height: height, width: width }}>
      <StyledHoverCard>
        <div
          style={{
            position: "relative",
            height: height,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            src={show.posterPath}
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
                {show.name}
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
                  {show.description}
                </Typography>
              </Box>

              <Stack
                direction="row"
                gap={2}
                justifyContent="space-between"
                alignItems={"center"}
                marginTop={0}
              >
                {/* <ItemRating rating={rating} />

                <Box flexGrow={1} /> */}

                <Typography variant="caption" color="text.secondary">
                  {metaDescription}
                </Typography>
              </Stack>
            </CardContent>
          </Stack>
        </div>
      </StyledHoverCard>
    </Box>
  );
}
