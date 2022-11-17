import { Movie, Tv, Person } from "../../TMDB/types";
import { ShowbizItem } from "../../TMDB/utils/convertToItem";

export interface CardProps {
  item: ShowbizItem;
  onClick?: (item: ShowbizItem) => void;
  height?: number | string | null;
  expanded?: boolean;
  maxDescLines?: number;
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
  maxDescLines?: number;
};
