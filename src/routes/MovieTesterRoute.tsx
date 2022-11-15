import { useParams } from "react-router-dom";
import LoadingTile from "../components/LoadingTile";
import NotFoundTile from "../components/NotFoundTile";
import ShowTester from "../components/ShowTester";
import { useMovie } from "../TMDB/hooks/useApi";

export default function TvTesterRoute() {
  const { id } = useParams();
  const [show, isLoading, error] = useMovie(id);

  if (isLoading) return <LoadingTile />;
  if (error) return <NotFoundTile />;
  if (!show) return <NotFoundTile />;

  return <ShowTester show={show} expanded={true} />;
}
