import { getAllGenres, showsWithGenre } from "@/utils/itemUtils";
import { GroupByDef, ShowbizItem } from "@types";

export default function getGenreGroupByDef({
  shows,
}: {
  shows: ShowbizItem[];
}): GroupByDef {
  const groupValues = getAllGenres(shows);
  const showGroups = groupValues.map((groupValue) => {
    const matchingShows = showsWithGenre(shows, groupValue) ?? [];
    return {
      title: groupValue,
      shows: matchingShows,
    };
  });

  return {
    title: "Collections",
    showGroups,
  };
}
