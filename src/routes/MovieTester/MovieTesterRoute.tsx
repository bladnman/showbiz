import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import BackdropList from "../../components/samples/BackdropList";
import LogoList from "../../components/samples/LogoList";
import PosterList from "../../components/samples/PosterList";
import BottomCard from "../../components/cards/BottomCard";
import { useMovie } from "../../TMDB/hooks/useApi";

export default function TvTesterRoute() {
  const { id } = useParams();
  const [show, isLoading, error] = useMovie(id);
  if (isLoading) return <LoadingTile />;
  if (!show || !id) return <NotFoundTile />;
  if (error) return <NotFoundTile />;

  return (
    <Box>
      <Box>
        <Typography variant="h3">TV Tester</Typography>
      </Box>

      {/* <ShowCard show={show} />

      <LogoList id={id} type={"movie"} />
      <PosterList id={id} type={"movie"} />
      <BackdropList id={id} type={"movie"} /> */}
    </Box>
  );
}
type ViewProps = { id?: number | string };
