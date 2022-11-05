import { Box, Card, Typography } from "@mui/material";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import { useMovie } from "../../TMDB/hooks/useApi";

export default function MovieRoute() {
  const { id } = useParams();
  const [movie, isLoading, error] = useMovie(id);

  const renderBody = useCallback(() => {
    if (isLoading) return <LoadingTile />;
    if (!movie) return <NotFoundTile />;
    if (error) return <NotFoundTile />;

    return (
      <Box mb={1}>
        <Card key={movie.id}>
          <Typography>{movie.title}</Typography>
        </Card>
      </Box>
    );
  }, [movie]);

  return (
    <Box>
      <Box>
        <Typography variant="h3">Movie View</Typography>
      </Box>

      {renderBody()}
    </Box>
  );
}
