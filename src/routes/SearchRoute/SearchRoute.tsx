import { GridView } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import ShowCard from "../../components/samples/ShowCard";
import { useSearch } from "../../TMDB/hooks/useApi";

export default function SearchRoute() {
  const { query, type } = useParams();
  const [shows, isLoading, error] = useSearch(query, { type });
  if (isLoading) return <LoadingTile />;
  if (!shows || !shows.length || !query) return <NotFoundTile />;
  if (error) return <NotFoundTile />;

  return (
    <Box>
      <Box>
        <Typography variant="h3">Search Tester</Typography>
      </Box>

      <Grid container spacing={3}>
        {shows.map((show) => (
          <Grid item>
            <ShowCard show={show} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
type ViewProps = { id?: number | string };
