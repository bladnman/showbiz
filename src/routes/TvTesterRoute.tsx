import { useParams } from "react-router-dom";
import LoadingTile from "../components/LoadingTile";
import NotFoundTile from "../components/NotFoundTile";
import ShowTester from "../components/ShowTester";
import { useTv } from "../TMDB/hooks/useApi";

export default function MovieTesterRoute() {
  const { id } = useParams();
  const [show, isLoading, error] = useTv(id);

  if (isLoading) return <LoadingTile />;
  if (error) return <NotFoundTile />;
  if (!show) return <NotFoundTile />;

  return <ShowTester show={show} />;
}
