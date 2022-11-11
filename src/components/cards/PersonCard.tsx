import { useMemo } from "react";
import { useBaseImageUrl } from "../../TMDB/hooks/useApi";
import { Person } from "../../TMDB/types";
import BottomCard from "./BottomCard";

export default function PersonCard({ person }: { person: Person }) {
  if (!person) return null;
  if (!person.name) return null;

  const baseImgUrl = useBaseImageUrl();

  const description = useMemo(() => {
    if (person.biography) {
      return person.biography;
    }
    if (person.knownFor) {
      const titles = person.knownFor.map(
        (item: any) => item.title ?? item.name
      );
      return `Known for: ${titles.join(", ")}`;
    }
  }, [person]);

  return (
    <BottomCard
      imageUrl={`${baseImgUrl}${person.profilePath}`}
      title={person.name}
      description={description}
    />
  );
}
