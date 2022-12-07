import { ShowbizItem } from "../../../@types";
import { fLeft } from "../../../utils/MU";

export default function getYear(show?: ShowbizItem | null): string | null {
  if (!show) return null;

  const stripYear = (ymd: string | null | undefined) => fLeft(ymd, "-");

  if (show.isMovie) {
    return stripYear(show.releaseDate);
  }
  if (show.isTv) {
    const firstYear = stripYear(show.firstAirDate);
    const isCompleted = show.status === "Ended" || show.status === "Canceled";
    const lastYear = isCompleted ? stripYear(show.lastAirDate) : "";

    return [firstYear, lastYear].join(" - ");
  }

  return null;
}
