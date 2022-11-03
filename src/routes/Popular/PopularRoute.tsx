import { Box, Card, Typography } from "@mui/material";
import useMovie from "../../TMDB/hooks/useMovie";

export default function PopularRoute() {
  const movie = useMovie(4194222);

  if (!movie) return null;
  return (
    <Box>
      <Box>
        <Typography variant="h3">Popular Movies</Typography>
      </Box>
      {/* {movies.map((movie) => ( */}
      <Box mb={1}>
        <Card key={movie.id}>
          <Typography>{movie.title}</Typography>
        </Card>
      </Box>
      {/* ))} */}
    </Box>
  );
}
