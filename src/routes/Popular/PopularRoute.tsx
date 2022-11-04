import { Box, Card, Typography } from "@mui/material";
import NotFoundTile from "../../components/NotFoundTile";
import useMovie from "../../TMDB/hooks/useMovie";
import LoadingTile from "../../components/LoadingTile";
import { useCallback } from "react";

export default function PopularRoute() {
  const movie = useMovie(4194222);

  // const renderBody = useCallback(() => {
  //   if (movie === undefined) return <LoadingTile />;
  //   if (movie === null) return <NotFoundTile />;

  //   return (
  //     <Box mb={1}>
  //       <Card key={movie.id}>
  //         <Typography>{movie.title}</Typography>
  //       </Card>
  //     </Box>
  //   );
  // }, [movie]);

  return (
    <Box>
      <Box>
        <Typography variant="h3">Popular Movies</Typography>
      </Box>

      {/* {renderBody()} */}
    </Box>
  );
}
