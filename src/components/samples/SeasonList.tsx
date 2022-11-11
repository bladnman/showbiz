import { Box, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useBaseImageUrl } from "../../TMDB/hooks/useApi";
import { Movie, Tv } from "../../TMDB/types";
import SampleHeader from "./SampleHeader";

export default function SeasonList({ show }: { show: Movie | Tv }) {
  const baseImgUrl = useBaseImageUrl();

  if (!show) return null;
  if (!show.isTv) return null;
  const seasons = (show as Tv).seasons;
  if (!seasons || seasons.length < 1) return null;

  return (
    <Box>
      <SampleHeader title={"Seasons"} total={seasons.length} />

      <ImageList cols={6} gap={12} variant="standard">
        {seasons.map((season) => (
          <ImageListItem key={season.posterPath}>
            <img src={`${baseImgUrl}${season.posterPath}`} loading="lazy" />
            <ImageListItemBar
              title={season.name}
              subtitle={`Episodes: ${season.episodeCount}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
