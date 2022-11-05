import {
  Box,
  Card,
  CardContent,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useParams } from "react-router-dom";
import { Season } from "../../@types/TMDB";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import {
  useMovie,
  useShowBackdrops,
  useShowLogos,
  useShowPosters,
  useTvShow,
} from "../../TMDB/hooks/useApi";

export default function MovieTesterRoute() {
  const { id } = useParams();

  if (!id) return null;
  return (
    <Box>
      <Box>
        <Typography variant="h3">TV Tester</Typography>
      </Box>

      <TvView id={id} />
      <LogoView id={id} />
      <PosterView id={id} />
      <BackdropView id={id} />
    </Box>
  );
}
type ViewProps = { id: number | string };

function TvView({ id }: ViewProps) {
  const [show, isLoading, error] = useTvShow(id);

  if (isLoading) return <LoadingTile />;
  if (!show) return <NotFoundTile />;
  if (error) return <NotFoundTile />;
  console.log(`🐽 tvShow`, show);
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
              {show.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {show.overview}
            </Typography>
            <Stack direction={"row"} gap={2} justifyContent="flex-end">
              <Typography variant="caption" color="text.secondary">
                Seasons: {show.seasons?.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Episodes: {episodeCount}
              </Typography>
            </Stack>
          </CardContent>
        </div>
      </Card>
    </Box>
  );
}
function Header({ title, total }: { title: string; total: number }) {
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Box mr={2}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <TotalBox total={total} />
    </Stack>
  );
}
function TotalBox({ total }: { total: number }) {
  if (!total) return null;
  return (
    <Box paddingX={1} paddingY={0} borderRadius={1} bgcolor={"#404040"}>
      <Typography>{total}</Typography>
    </Box>
  );
}
function LogoView({ id }: ViewProps) {
  const [logos, isLoading, error] = useShowLogos(id, "tv", {
    includeImageLanguage: ["null", "en"],
  });

  if (isLoading) return <LoadingTile />;
  if (!logos) return <NotFoundTile />;
  if (error) return <NotFoundTile />;

  return (
    <Box>
      <Header title={"Logos"} total={logos.length} />

      <ImageList cols={3} gap={12} variant="standard">
        {logos.map((item) => (
          <ImageListItem key={item.filePath}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.filePath}`}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.voteAverage}
              subtitle={`Votes: ${item.voteCount}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
function PosterView({ id }: ViewProps) {
  const [posters, isLoading, error] = useShowPosters(id, "tv", {
    includeImageLanguage: ["null", "en"],
    page: 1,
  });

  if (isLoading) return <LoadingTile />;
  if (!posters) return <NotFoundTile />;
  if (error) return <NotFoundTile />;

  return (
    <Box>
      <Header title={"Posters"} total={posters.length} />

      <ImageList cols={4} gap={12} variant="standard">
        {posters.map((item) => (
          <ImageListItem key={item.filePath}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.filePath}`}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.voteAverage}
              subtitle={`Votes: ${item.voteCount}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
function BackdropView({ id }: ViewProps) {
  const theme = useTheme();
  const [posters, isLoading, error] = useShowBackdrops(id, "tv", {
    includeImageLanguage: ["null", "en"],
  });

  if (isLoading) return <LoadingTile />;
  if (!posters) return <NotFoundTile />;
  if (error) return <NotFoundTile />;

  return (
    <Box>
      <Header title={"Backdrops"} total={posters.length} />
      <ImageList cols={4} gap={12} variant="standard">
        {posters.map((item) => (
          <ImageListItem key={item.filePath}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.filePath}`}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.voteAverage}
              subtitle={`Votes: ${item.voteCount}`}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
function PersonView({ id }: ViewProps) {
  return <div>PersonView</div>;
}
function useMoviePoster(id: number): [any, any, any] {
  throw new Error("Function not implemented.");
}
