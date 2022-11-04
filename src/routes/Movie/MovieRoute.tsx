import { Box, Card, Typography } from "@mui/material";
import NotFoundTile from "../../components/NotFoundTile";
import useMovie from "../../TMDB/hooks/useMovie";
import LoadingTile from "../../components/LoadingTile";
import { useCallback } from "react";
import { useParams } from "react-router-dom";

export default function MovieRoute() {
  const { id } = useParams();
  const movie = useMovie(Number(id ?? 14));

  const renderBody = useCallback(() => {
    if (movie === undefined) return <LoadingTile />;
    if (movie === null) return <NotFoundTile />;

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
