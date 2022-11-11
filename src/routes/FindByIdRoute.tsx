import { GridView } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import LoadingTile from "../components/LoadingTile";
import NotFoundTile from "../components/NotFoundTile";
import BottomCard from "../components/cards/BottomCard";
import { useFindShowById } from "../TMDB/hooks/useApi";
import { ExternalSource } from "../TMDB/types";

export default function FindByIdRoute() {
  const { id, externalSource } = useParams();
  const [show, isLoading, error] = useFindShowById(
    id,
    externalSource as ExternalSource
  );
  if (isLoading) return <LoadingTile />;
  if (!show || !id) return <NotFoundTile />;
  if (error) return <NotFoundTile />;

  return (
    <Box>
      <Box>
        <Typography variant="h3">Find by Id</Typography>
      </Box>

      <BottomCard show={show} />
    </Box>
  );
}
type ViewProps = { id?: number | string };
