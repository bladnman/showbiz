import { useMemo } from "react";
import { Person } from "../../TMDB/types";
import BottomCard from "./BottomCard";
import { CardProps } from "./types";

export default function PersonCard(props: CardProps) {
  const { height, expanded, maxDescLines } = props;
  const item = props.item as Person;
  if (!item) return null;
  if (!item.name) return null;

  const description = useMemo(() => {
    if (item.biography) {
      return item.biography;
    }
    if (item.knownFor) {
      const titles = item.knownFor.map((item: any) => item.title ?? item.name);
      return `Known for: ${titles.join(", ")}`;
    }
  }, [item]);

  return (
    <BottomCard
      imagePosterUrl={`${item.profilePath}`}
      title={item.name}
      description={description}
      height={height}
      expanded={expanded}
      maxDescLines={maxDescLines}
    />
  );
}
