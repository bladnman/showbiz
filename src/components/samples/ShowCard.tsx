import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { Movie, Season, TvShow } from "../../TMDB/types";

export default function ShowCard({ show }: { show: Movie | TvShow }) {
  if (!show) return null;

  const renderMeta = () => {
    if ("name" in show) return <TvMeta show={show} />;
    return <MovieMeta show={show} />;
  };
  return (
    <Box>
      <Typography variant="h6">TV Show</Typography>
      <Card key={show.id} sx={{ maxWidth: 450 }}>
        <div style={{ position: "relative", overflow: "visible" }}>
          <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/original${show.backdropPath}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {"name" in show ? show.name : (show as Movie).title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {show.overview}
            </Typography>
            {renderMeta()}
          </CardContent>
        </div>
      </Card>
    </Box>
  );
}
const TvMeta = ({ show }: { show: TvShow }) => {
  const countEpisodes = (seasons?: Season[]) => {
    let total = 0;
    seasons &&
      seasons.forEach((season) => {
        total += season?.episodeCount ?? 0;
      });
    return total;
  };
  const episodeCount = countEpisodes(show?.seasons);
  return (
    <Stack direction={"row"} gap={2} justifyContent="flex-end">
      <Typography variant="caption" color="text.secondary">
        Seasons: {show.seasons?.length}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Episodes: {episodeCount}
      </Typography>
    </Stack>
  );
};
const MovieMeta = ({ show }: { show: Movie }) => {
  return (
    <Stack direction={"row"} gap={2} justifyContent="flex-end">
      <Typography variant="caption" color="text.secondary">
        Released: {show.releaseDate}
      </Typography>
    </Stack>
  );
};
