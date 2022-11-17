import { useParams } from "react-router-dom";
import { useTv } from "../../TMDB/hooks/useApi";
import DetailsRoute from "./DetailsRoute";

export default function TvDetailsRoute() {
  const { id } = useParams();
  const [item, isLoading, error] = useTv(id);
  return <DetailsRoute item={item} isLoading={isLoading} error={error} />;
}
