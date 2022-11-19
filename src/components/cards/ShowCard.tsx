import CoverHoverCard from "./cover-hover-card/CoverHoverCard";
import { CardProps } from "./types";

export default function ShowCard(props: CardProps) {
  const item = props.item;
  if (!item) return null;
  if (!item.name) return null;
  return <CoverHoverCard show={item} />;
}
