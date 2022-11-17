import { useParams } from "react-router-dom";
import { useMovie } from "../../TMDB/hooks/useApi";
import DetailsRoute from "./DetailsRoute";

export default function MovieDetailsRoute() {
  const { id } = useParams();
  const [item, isLoading, error] = useMovie(id);
  return <DetailsRoute item={item} isLoading={isLoading} error={error} />;
}
