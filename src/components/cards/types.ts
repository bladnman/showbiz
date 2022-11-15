import { Movie, Tv, Person } from "../../TMDB/types";

export interface CardProps {
  item: Movie | Tv | Person;
  onClick?: (item: Movie | Tv | Person) => void;
  height?: number | string | null;
  expanded?: boolean;
}
export type BottomCardProps = {
  imagePosterUrl: string;
  imageBackdropUrl?: string;
  title: string;
  description?: SoN;
  rating?: number | null;
  metaDescription?: SoN;
  height?: number | string | null;
  expanded?: boolean;
};
