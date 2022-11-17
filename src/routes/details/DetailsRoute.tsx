import Details from "../../components/Details";
import LoadingTile from "../../components/LoadingTile";
import NotFoundTile from "../../components/NotFoundTile";
import { Movie, Tv } from "../../TMDB/types";

type DetailsRouteProps = {
  item: Tv | Movie | null | undefined;
  isLoading: boolean;
  error: any;
};
export default function DetailsRoute({
  item,
  isLoading,
  error,
}: DetailsRouteProps) {
  if (isLoading) return <LoadingTile />;
  if (error) return <NotFoundTile />;
  if (!item) return <NotFoundTile />;

  return <Details item={item} />;
}
