import {
  Box,
  Card,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useParams } from "react-router-dom";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import {
  useMovie,
  useMovieBackdrops,
  useMovieLogos,
  useMoviePosters,
} from "../../TMDB/hooks/useApi";

export default function TvTesterRoute() {
  const { id } = useParams();

  return (
    <Box>
      <Box>
        <Typography variant="h3">TV Tester</Typography>
      </Box>

      <MovieView id={id} />

      <LogoView id={id} />
      <PosterView id={id} />
      <BackdropView id={id} />
    </Box>
  );
}
type ViewProps = { id?: number | string };

function MovieView({ id }: ViewProps) {
  const [movie, isLoading, error] = useMovie(id);

  if (isLoading) return <LoadingTile />;
  if (!movie) return <NotFoundTile />;
  if (error) return <NotFoundTile />;
  console.log(`🐽 [ApiTesterRoute] movie`, movie);
  return (
    <Box>
      <Typography variant="h6">Movie</Typography>
      <Box mb={1}>
        <Card key={movie.id}>
          <Typography>{movie.title}</Typography>
        </Card>
      </Box>
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
  const [logos, isLoading, error] = useMovieLogos(id, {
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
  const [posters, isLoading, error] = useMoviePosters(id, {
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
  const [posters, isLoading, error] = useMovieBackdrops(id, {
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
